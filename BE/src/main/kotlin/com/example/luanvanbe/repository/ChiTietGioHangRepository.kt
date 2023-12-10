package com.example.luanvanbe.repository

import com.example.luanvanbe.model.ChiTietGioHang
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ChiTietGioHangRepository: JpaRepository<ChiTietGioHang, Long> {
    @Query("select c from ChiTietGioHang c where c.sanPham.sp_id = :sanphamId and c.gioHang.gh_id = :giohangId")
    fun findBySanPhamIdAndGioHangId(sanphamId: Long, giohangId: Long): ChiTietGioHang
}