package com.example.luanvanbe.controller

import com.example.luanvanbe.dto.DanhGiaDTORequest
import com.example.luanvanbe.model.DanhGia
import com.example.luanvanbe.service.DanhGiaService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/test")
class DanhGiaController(
    @Autowired val danhGiaService: DanhGiaService
) {
//Thêm đánh giá cho sản phẩm dựa trên idDonHang và idSanPham
    @PostMapping("/danh-gia/don-hang/{idDonHang}/san-pham/{idSanPham}")
    fun addNewReviewForProducts(@PathVariable idDonHang: Long, @PathVariable idSanPham: Long,
                                @RequestBody danhGiaDTORequest: DanhGiaDTORequest): ResponseEntity<DanhGia>{
        return ResponseEntity(danhGiaService.addNewReviewForOrder(idDonHang, idSanPham, danhGiaDTORequest), HttpStatus.CREATED)
    }

//    Hiển thị tất cả đánh giá dựa trên đơn hàng
    @GetMapping("/danh-gia/don-hang/{idDonHang}")
    fun getReviewByIdDonHang(@PathVariable idDonHang: Long): ResponseEntity<List<DanhGia>>{
        return ResponseEntity.ok(danhGiaService.getAllReviewByIdDonHang(idDonHang))
    }

// Hiển thị tất cả đánh giá dựa trên sản phẩm
    @GetMapping("/danh-gia/san-pham/{idSanPham}")
    fun getReviewByIdSanPham(@PathVariable idSanPham: Long): ResponseEntity<List<DanhGia>>{
        return ResponseEntity.ok(danhGiaService.getAllReviewByIdSanPham(idSanPham))
    }

}