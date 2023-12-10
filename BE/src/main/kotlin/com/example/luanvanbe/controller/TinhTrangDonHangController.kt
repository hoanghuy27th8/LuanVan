package com.example.luanvanbe.controller

import com.example.luanvanbe.model.TinhTrangDonHang
import com.example.luanvanbe.service.TinhTrangDonHangService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/test")
class TinhTrangDonHangController(
        val tinhTrangDonHangService: TinhTrangDonHangService
) {
    @GetMapping("/tinh-trang-don-hang")
    fun getAllTinhTrang(): ResponseEntity<List<TinhTrangDonHang>>{
        return ResponseEntity.ok(tinhTrangDonHangService.getAllTinhTrang())
    }
}