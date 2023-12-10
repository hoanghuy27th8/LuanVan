package com.example.luanvanbe.controller

import com.example.luanvanbe.dto.DonHangDTOReques
import com.example.luanvanbe.dto.ThongKeDonHangTheoThang
import com.example.luanvanbe.model.DonHang
import com.example.luanvanbe.service.DonHangService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api/test")
class DonHangController(
    @Autowired val donHangService: DonHangService
) {
// Lấy tất cả đơn hàng findAll
    @GetMapping("/don-hang")
    fun getAllOrder(): ResponseEntity<List<DonHang>>{
        return ResponseEntity.ok(donHangService.getAllDonHang())
    }
// Lấy tất cả đơn hàng dựa trên idKhachHang
    @GetMapping("/don-hang/{idKhachHang}")
    fun getAllOderByIdCustormer(@PathVariable idKhachHang: Long) : ResponseEntity<List<DonHang>>{
        return ResponseEntity.ok(donHangService.getOrderByIdKhachHang(idKhachHang))
    }
// Lấy thông tin đơn hàng dựa vào idKhachHang và idDonHang'
    @GetMapping("/don-hang/{idKhachHang}/{idDonHang}")
    fun getOrderByIdCustormerAndIdOrder(@PathVariable idKhachHang: Long, @PathVariable idDonHang: Long): ResponseEntity<DonHang>{
        return  ResponseEntity.ok(donHangService.getOrderByIDKhachHangAndIdOrder(idKhachHang, idDonHang))
    }
//    Lấy đơn hàng dựa vào id đơn hàng
    @GetMapping("/don-hang/{idDonHang}/chi-tiet")
    fun getOrderById(@PathVariable idDonHang: Long): ResponseEntity<DonHang>{
        return ResponseEntity.ok(donHangService.getOrderById(idDonHang))
    }

    @PostMapping("/tao-don-hang")
    fun createNewOrder(@RequestBody donHangDTOReques: DonHangDTOReques): ResponseEntity<DonHang>{
        return ResponseEntity(donHangService.newOrderByIdCustormer(donHangDTOReques), HttpStatus.CREATED)
    }
    @GetMapping("/IdDonHang")
    fun getIdDonHangMax(): ResponseEntity<Long> = ResponseEntity.ok(donHangService.getDonHangIdMax())

    @GetMapping("/thong-ke/don-hang/{nam}")
    fun getTongDoanhThu(@PathVariable nam: String): ResponseEntity<List<ThongKeDonHangTheoThang>>{
        return ResponseEntity.ok(donHangService.getThongKeDonHangTheoThang(nam))
    }

    @PostMapping("/don-hang/cap-nhat-trang-thai/{idDonHang}/{idTrangThai}")
    fun updateStatusOrder(@PathVariable idDonHang: Long, @PathVariable idTrangThai: Long): ResponseEntity<DonHang?>{
        return ResponseEntity.ok(donHangService.updateStatusOrder(idDonHang, idTrangThai))
    }

//    Xuất PDF cho đơn hangf
    @GetMapping("/don-hang/{idDonHang}/xuat-pdf")
    fun exportPDFOrder(@PathVariable idDonHang: Long, response: HttpServletResponse){
        val donhang = donHangService.getOrderById(idDonHang)
        val pdfByteArray  = donHangService.createrNewPDF(donhang)
        val headerKey = "Content-Disposition"
        val headerValue = "attachment; filename=don-hang_${donhang.dh_id}.pdf"
        response.contentType = "application/pdf"
        response.setHeader(headerKey, headerValue)
        response.outputStream.write(pdfByteArray)
        response.outputStream.flush()
    }


}