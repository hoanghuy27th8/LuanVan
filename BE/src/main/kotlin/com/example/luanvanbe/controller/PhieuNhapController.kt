package com.example.luanvanbe.controller

import com.example.luanvanbe.dto.SanPhamGiaoDichDto
import com.example.luanvanbe.model.ChiTietPhieuNhap
import com.example.luanvanbe.model.PhieuNhap
import com.example.luanvanbe.repository.ChiTietPhieuNhapRepo
import com.example.luanvanbe.service.PhieuNhapService
import com.fasterxml.jackson.annotation.JsonFormat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.text.SimpleDateFormat
import java.util.*

data class PhieuNhapRequest(
        val idNhanVien: Long,
        val idNhaCungCap:Long,
        @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
        val ngayNhap: Date,
        val dsSanPham: List<SanPhamGiaoDichDto>
)

@RestController
@RequestMapping("/api/test")
class PhieuNhapController(
        @Autowired val phieuNhapService: PhieuNhapService,
        @Autowired val chiTietPhieuNhapRepo: ChiTietPhieuNhapRepo
) {

    @PostMapping("/nhap-hang")
    fun taoPhieuNhap(@RequestBody request: PhieuNhapRequest) : ResponseEntity<PhieuNhap>{
        return ResponseEntity(phieuNhapService.taoPhieuNhapMoi(request.idNhanVien,request.idNhaCungCap,request.ngayNhap, request.dsSanPham), HttpStatus.CREATED)
    }

//    Lấy toàn bộ chi tiết phiếu nhập có thể tạo 1 controller khác (nhưng làm biếng)
    @GetMapping("/nhap-hang/{id}")
    fun getDataDetailsPhieuNhap(@PathVariable id: Long): PhieuNhap{
        return phieuNhapService.getDataPhieuNhap(id)
    }
}