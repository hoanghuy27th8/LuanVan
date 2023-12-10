package com.example.luanvanbe.service

import com.example.luanvanbe.dto.SanPhamDTORequest
import com.example.luanvanbe.dto.SanPhamDTOResponseSug
import com.example.luanvanbe.model.DacTinh
import com.example.luanvanbe.model.SanPham
import com.example.luanvanbe.repository.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.util.Date

@Service
class SanPhamService (
        @Autowired val sanPhamRepository: SanPhamRepository,
        @Autowired val hinhAnhRepository: HinhAnhRepository,
        @Autowired val dacTinhRepository: DacTinhRepository,
        @Autowired val thuongHieuRepository: ThuongHieuRepository, private val khuyenMaiRepository: KhuyenMaiRepository
) {
    fun addProduct(sanPhamDTORequest: SanPhamDTORequest): SanPham {
        val thuongHieu = thuongHieuRepository.findById(sanPhamDTORequest.thuonghieu).orElse(null)
        val dacTinhs = sanPhamDTORequest.listIdDactinh!!.map { idDacTinh ->
            dacTinhRepository.findDacTinhByDt_id(idDacTinh)
        }
        val sanPham = SanPham(
            sp_id = 0,
            sp_ten = sanPhamDTORequest.sp_ten,
            sp_card = sanPhamDTORequest.sp_card,
            sp_cpu = sanPhamDTORequest.sp_cpu,
            sp_gia = sanPhamDTORequest.sp_gia,
            sp_manhinh = sanPhamDTORequest.sp_manhinh,
            sp_mota = sanPhamDTORequest.sp_mota,
            sp_ocung = sanPhamDTORequest.sp_ocung,
            sp_ram = sanPhamDTORequest.sp_ram,
            sp_soluong = sanPhamDTORequest.sp_soluong,
            thuonghieu = thuongHieu,
            dacTinhs = dacTinhs
        )
        return sanPhamRepository.save(sanPham)
    }
    fun testDactinh(listId: List<Long>): List<DacTinh> {
        val kq = listId.map{ id -> dacTinhRepository.findDacTinhByDt_id(id)}
        return kq
    }

    fun getAllProduct(): List<SanPham> {
        return sanPhamRepository.findAll()
    }
    fun autoRemovePromotion(){ // tự động xóa các khuyến mãi đã quá thời hạn, cần thêm vào một hàm nào đó để load toàn bộ sản phẩm
        val currentDay = Date()
        val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
        val currentDayAfterFormat = dateFormat.format(currentDay)
        val sanphamKM = getSanPhanKhuyenMai()
        sanphamKM.map { sanPham ->
            val ngayKhuyenMai = dateFormat.format(sanPham.khuyenMai!!.gg_ngayketthuc)
            if(ngayKhuyenMai < currentDayAfterFormat){
                sanPham.khuyenMai = null
                sanPhamRepository.save(sanPham)
            }else {
                print("\n"+ngayKhuyenMai+" khuyen mai con han")
            }
        }
    }

    fun getSanPhanKhuyenMai(): List<SanPham> {
        return sanPhamRepository.findSanPhamByKhuyenMaiIsNotNull()
    }

    fun findPrductById( id: Long) : SanPham {
        return sanPhamRepository.findById(id).get()
    }

    fun findProductByIdThuongHieu(id: Long): List<SanPham> = sanPhamRepository.findSanPhamByThuonghieuTh_id(id)

    fun findProductByNameContais(name: String): List<SanPham> =sanPhamRepository.findSanPhamBySp_tenContains(name)

    fun findPriductByGia(min: Long, max: Long): List<SanPham> = sanPhamRepository.findSanPhamByGia(min, max)

    fun findProductsByIdDacTinh(idDacTinh: Long): SanPhamDTOResponseSug {
        val list_sp = sanPhamRepository.findSanPhamByDacTinhs_Id(idDacTinh)
        val dacTinh = dacTinhRepository.findDacTinhByDt_id(idDacTinh)
        return SanPhamDTOResponseSug(dacTinh, list_sp)
    }

//    Tìm sản phẩm sắp bán hết ( <= 20 sản phẩm)
    fun findProductSoldOut(): List<SanPham>{
        return sanPhamRepository.findSanPhamBySoldOut()
    }

    fun updateProductById(id : Long, sanPhamDTORequest: SanPhamDTORequest) : SanPham {
        val sanPham = sanPhamRepository.findById(id).orElse(null)
        val thuongHieu = thuongHieuRepository.findById(sanPhamDTORequest.thuonghieu).orElse(null)
        val khuyenMai = sanPhamDTORequest.khuyenmai?.let { khuyenMaiRepository.findById(it).orElse(null) }
        val dacTinhs = sanPhamDTORequest.listIdDactinh!!.map { idDacTinh ->
            dacTinhRepository.findDacTinhByDt_id(idDacTinh)
        }
        if(sanPham != null && thuongHieu != null){
            sanPham.sp_ten = sanPhamDTORequest.sp_ten
            sanPham.sp_card = sanPhamDTORequest.sp_card
            sanPham.sp_cpu = sanPhamDTORequest.sp_cpu
            sanPham.sp_gia = sanPhamDTORequest.sp_gia
            sanPham.sp_manhinh = sanPhamDTORequest.sp_manhinh
            sanPham.sp_mota = sanPhamDTORequest.sp_mota
            sanPham.sp_ocung = sanPhamDTORequest.sp_ocung
            sanPham.sp_ram = sanPhamDTORequest.sp_ram
            sanPham.sp_soluong = sanPhamDTORequest.sp_soluong
            sanPham.thuonghieu = thuongHieu
            sanPham.khuyenMai = khuyenMai
            sanPham.dacTinhs = dacTinhs
        }
        return sanPhamRepository.save(sanPham)
    }
    fun updateProductByNewProduct(sanPham : SanPham): SanPham{
        val sanPhamOld = sanPhamRepository.findById(sanPham.sp_id).orElse(null)
        sanPhamOld.sp_ten = sanPham.sp_ten
        sanPhamOld.sp_card = sanPham.sp_card
        sanPhamOld.sp_cpu = sanPham.sp_cpu
        sanPhamOld.sp_gia = sanPham.sp_gia
        sanPhamOld.sp_manhinh = sanPham.sp_manhinh
        sanPhamOld.sp_mota = sanPham.sp_mota
        sanPhamOld.sp_ocung = sanPham.sp_ocung
        sanPhamOld.sp_ram = sanPham.sp_ram
        sanPhamOld.sp_soluong = sanPham.sp_soluong
        sanPhamOld.thuonghieu = sanPham.thuonghieu
        sanPhamOld.khuyenMai = sanPham.khuyenMai

        return sanPhamRepository.save(sanPhamOld)
    }

    @Transactional
    fun deleteProductById(id: Long): Unit {
        hinhAnhRepository.deleteBySanPhamId(id)
        sanPhamRepository.deleteSanPhamById(id)
    }


}