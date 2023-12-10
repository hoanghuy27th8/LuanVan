package com.example.luanvanbe.dto

import com.example.luanvanbe.model.SanPham

data class SanPhamGiaoDichDto(
    val sanPham: SanPham, // Đối tượng sản phẩm
    val donGia: Long, // Đơn giá
    val soLuong: Int // Số lượng
)
