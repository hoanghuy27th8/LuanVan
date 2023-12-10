package com.example.luanvanbe.service

import com.example.luanvanbe.dto.DanhGiaDTORequest
import com.example.luanvanbe.model.DanhGia
import com.example.luanvanbe.repository.DanhGiaRepository
import com.example.luanvanbe.repository.DonHangRepository
import com.example.luanvanbe.repository.SanPhamRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException

@Service
class DanhGiaService(
    @Autowired val danhGiaRepository: DanhGiaRepository,
    @Autowired val donHangRepository: DonHangRepository,
    @Autowired val sanPhamRepository: SanPhamRepository
) {

    fun addNewReviewForOrder(idDonHang: Long, idSanPham: Long, danhGiaDTORequest: DanhGiaDTORequest): DanhGia{
        val donHang = donHangRepository.findById(idDonHang).orElse(null)
        val sanPham = sanPhamRepository.findById(idSanPham).orElse(null)

        if(donHang == null || sanPham == null){
            throw EntityNotFoundException("Không tìm thấy đơn hàng hoặc sản phẩm.")
        }
        var danhGia = DanhGia(
            dg_id = 0,
            dg_noiDung = danhGiaDTORequest.noiDung,
            dg_ngayDanhGia = danhGiaDTORequest.ngayDanhGia,
            donHang = donHang,
            sanPham = sanPham
        )
        var danhGiaSave = danhGiaRepository.save(danhGia)
        return danhGiaSave
    }

    fun getAllReviewByIdDonHang(idDonHang: Long): List<DanhGia>{
        return danhGiaRepository.findDanhGiaByDg_id(idDonHang)
    }

    fun getAllReviewByIdSanPham(idSanPham: Long): List<DanhGia>{
        return danhGiaRepository.findDanhGiaBySp_id(idSanPham)
    }

}