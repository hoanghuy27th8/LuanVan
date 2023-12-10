package com.example.luanvanbe.controller

import com.example.luanvanbe.dto.SanPhamGiaoDichDto
import com.example.luanvanbe.model.GioHang
import com.example.luanvanbe.repository.GioHangRepository
import com.example.luanvanbe.repository.KhachHangRepository
import com.example.luanvanbe.service.GioHangService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = arrayOf("http://localhost:3000"))
class GioHangController(
        @Autowired val gioHangService: GioHangService,
        @Autowired val gioHangRepository: GioHangRepository
) {
    @PostMapping("/gio-hang/{idKhachHang}")
    fun addProductIntoCart(@PathVariable idKhachHang: Long,@RequestBody dsSanPham: List<SanPhamGiaoDichDto>): ResponseEntity<GioHang>{
        return ResponseEntity.ok(gioHangService.addProductIntoCart(idKhachHang,dsSanPham))
    }

    @GetMapping("/gio-hang")
    fun getAllCart(): ResponseEntity<List<GioHang>>{
        return ResponseEntity(gioHangService.getAllProductInCart(), HttpStatus.OK)
    }

    @DeleteMapping("/gio-hang/{idKhachHang}/{sanphamId}")
    fun deleteProductOutCart(@PathVariable idKhachHang: Long, @PathVariable sanphamId: Long): ResponseEntity<GioHang>{
        return ResponseEntity.ok(gioHangService.deleteProductOutCart(idKhachHang, sanphamId))
    }

    @PutMapping("/gio-hang/{idKhachHang}/{sanphamId}/soluong/{soluong}")
    fun updateProductInCart(@PathVariable idKhachHang: Long, @PathVariable sanphamId: Long, @PathVariable soluong: Int): ResponseEntity<GioHang>{
        return ResponseEntity.ok(gioHangService.updateQuantityProductInCart(idKhachHang, sanphamId, soluong))
    }
}