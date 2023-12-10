package com.example.luanvanbe.service

import com.example.luanvanbe.dto.DonHangDTOReques
import com.example.luanvanbe.dto.ThongKeDonHangTheoThang
import com.example.luanvanbe.model.ChiTietDonHang
import com.example.luanvanbe.model.DonHang
import com.example.luanvanbe.model.SanPham
import com.example.luanvanbe.repository.*
import com.itextpdf.io.font.PdfEncodings
import com.itextpdf.kernel.font.PdfFontFactory
import com.itextpdf.kernel.geom.PageSize
import com.itextpdf.kernel.pdf.PdfDocument
import com.itextpdf.kernel.pdf.PdfWriter
import com.itextpdf.layout.Document
import com.itextpdf.layout.element.Cell
import com.itextpdf.layout.element.Paragraph
import com.itextpdf.layout.element.Table
import com.itextpdf.layout.properties.TextAlignment
import com.sun.javafx.font.FontFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.io.ByteArrayOutputStream
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.NoSuchElementException

@Service
class DonHangService(
    @Autowired val sanPhamService: SanPhamService,
    @Autowired val donHangRepository: DonHangRepository,
    @Autowired val chiTietDonHangRepository: ChiTietDonHangRepository,
    @Autowired val khachHangRepository: KhachHangRepository,
    @Autowired val hinhThucThanhToanRepo: HinhThucThanhToanRepo,
    @Autowired val tinhTrangDonHangRepo: TinhTrangDonHangRepo, private val sanPhamRepository: SanPhamRepository
) {

    fun newOrderByIdCustormer(donHangRequest: DonHangDTOReques): DonHang{
        val khachHang = khachHangRepository.findById(donHangRequest.idKhachHang).orElseThrow{ NoSuchElementException("Không tìm thấy khách hàng")}
        val listSanPham = donHangRequest.sanPhams
        val hinhthucTT = hinhThucThanhToanRepo.findById(donHangRequest.idHinhThucThanhToan).get()
        val tinhTrangDH = tinhTrangDonHangRepo.findById(donHangRequest.idTinhTrangDonHang).get()
        var donHang = DonHang(
            dh_id = 0,
            dh_tinhTrangThanhToan = donHangRequest.tinhTrangThanhToan,
            dh_ngayDatHang = donHangRequest.ngayDatHang,
            dh_ghiChu = donHangRequest.ghiChu,
            dh_tongGia = 0,
            khachHang = khachHang,
            dh_diaChiGiaoHaang = donHangRequest.diaChiGiaoHang,
            chiTietDonHang = null,
            hinhThucThanhToan = hinhthucTT,
            tinhTrangDonHang = tinhTrangDH,
        )
        donHang.chiTietDonHang = listSanPham.map {sanpham ->
            ChiTietDonHang(
                ctdh_id = 0,
                ctdh_soLuong = sanpham.soLuong,
                sanPham = sanpham.sanPham,
                donHang = donHang
            )
        }
        listSanPham.map { item ->
            item.sanPham.sp_soluong -= item.soLuong
            sanPhamService.updateProductByNewProduct(item.sanPham)
        }
        donHang.dh_tongGia = calculateTotalPrice(donHang.chiTietDonHang as List<ChiTietDonHang>)
        donHangRepository.save(donHang)

        return donHang
    }
    private fun calculateTotalPrice(chiTietDonHangs: List<ChiTietDonHang>): Long {
        var totalPrice = 0L
        for (chiTietDonHang in chiTietDonHangs) {
            totalPrice += chiTietDonHang.ctdh_soLuong * chiTietDonHang.sanPham!!.sp_gia
        }
        return totalPrice
    }
    fun getOrderById(idDonHang: Long): DonHang{
        return donHangRepository.findDonHangById(idDonHang)
    }

    fun getOrderByIdKhachHang(idKhachHang: Long): List<DonHang>{
        return donHangRepository.findDonHangByKhachHangKh_id(idKhachHang)
    }

    fun getOrderByIDKhachHangAndIdOrder(idKhachHang: Long, idDonHang: Long): DonHang{
        return donHangRepository.findDonHangByKhachHangkh_idAAndAndDh_id(idKhachHang, idDonHang)
    }

    fun getDonHangIdMax(): Long{
        return donHangRepository.findMaxOrderId()
    }

    fun getAllDonHang(): List<DonHang>{
        return donHangRepository.findAll()
    }

    fun getThongKeDonHangTheoThang(nam : String): List<ThongKeDonHangTheoThang>{
        return donHangRepository.getTongTienByThangTrongNam(nam)
    }

//    Update trang thai don hang ben Admin
    fun updateStatusOrder(idDonHang: Long, idTrangThai: Long): DonHang?{
        val donhang = donHangRepository.findDonHangById(idDonHang)
        val tinhtrangdonhang = tinhTrangDonHangRepo.findById(idTrangThai).get()

        if(donhang != null && tinhtrangdonhang != null){
            donhang.tinhTrangDonHang = tinhtrangdonhang
            return donHangRepository.save(donhang)
        }
        else{
            print("Loi khi tim don hang va trang thai don hang")
            return null
        }
    }

//    Xuất PDF cho đơn hàng
    fun createrNewPDF(donHang: DonHang): ByteArray{
        val byteArrayOutputStream = ByteArrayOutputStream()
        val pdfWriter = PdfWriter(byteArrayOutputStream)
        val pdf = PdfDocument(pdfWriter)
        val document = Document(pdf, PageSize.A5)
        val font = PdfFontFactory.createFont("C:\\Windows\\Fonts\\Arial.ttf", PdfEncodings.IDENTITY_H)
        val inputDate = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S")
        val outputDate = DateTimeFormatter.ofPattern("dd/MM/yyyy")
        val localDate = LocalDateTime.parse(donHang.dh_ngayDatHang.toString(), inputDate)
        val formatDate = outputDate.format(localDate)

        val paragraph = Paragraph("Hóa đơn bán hàng")
                .setTextAlignment(TextAlignment.CENTER)
                .setFontSize(25f)
                .setFont(font)
        document.add(paragraph)
        document.add(Paragraph("ID Đơn hàng: LT4Y${donHang.dh_id}NTMY").setTextAlignment(TextAlignment.LEFT).setFont(font))
        document.add(Paragraph("Ngày đặt hàng: ${formatDate}").setTextAlignment(TextAlignment.LEFT).setFont(font))
        document.add(Paragraph("Tên khách hàng: ${donHang.khachHang!!.kh_ten}").setFont(font))
        document.add(Paragraph("Số điện thoại: ${donHang.khachHang!!.kh_sdt}").setTextAlignment(TextAlignment.LEFT).setFont(font))
        document.add(Paragraph("Email: ${donHang.khachHang!!.kh_emial}").setTextAlignment(TextAlignment.LEFT).setFont(font))
        document.add(Paragraph("Địa chỉ giao hàng: ${donHang.dh_diaChiGiaoHaang}").setTextAlignment(TextAlignment.LEFT).setFont(font))

        val table = Table(3)
        table.addCell(Cell().add(Paragraph("Sản phẩm").setFont(font).setTextAlignment(TextAlignment.CENTER)))
        table.addCell(Cell().add(Paragraph("Số lượng").setFont(font)))
        table.addCell(Cell().add(Paragraph("Giá (VNĐ)").setFont(font)))

        for (sanpham in donHang.chiTietDonHang!!){
            table.addCell(Cell().add(Paragraph(sanpham.sanPham!!.sp_ten)))
            table.addCell(Cell().add(Paragraph(sanpham.ctdh_soLuong.toString())).setTextAlignment(TextAlignment.CENTER))
            table.addCell(Cell().add(Paragraph(sanpham.sanPham!!.sp_gia.toString()).setTextAlignment(TextAlignment.CENTER)))
        }
        document.add(table)

        document.add(Paragraph("Tổng giá trị: ${donHang.dh_tongGia}").setTextAlignment(TextAlignment.LEFT).setFont(font))
        document.add(Paragraph("Phương thức thanh toán: ${donHang.hinhThucThanhToan!!.httt_ten}").setFont(font).setTextAlignment(TextAlignment.LEFT))
        document.close()
        pdf.close()
        return byteArrayOutputStream.toByteArray()
    }

}

