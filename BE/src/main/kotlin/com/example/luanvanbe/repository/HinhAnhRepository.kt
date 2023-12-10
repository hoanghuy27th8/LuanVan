package com.example.luanvanbe.repository

import com.example.luanvanbe.model.HinhAnh
import com.example.luanvanbe.model.SanPham
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface HinhAnhRepository : JpaRepository<HinhAnh, Long>{
    fun findHinhAnhBySanPham(sanpham : SanPham) : List<HinhAnh>

    @Modifying
    @Query("DELETE FROM HinhAnh ha WHERE ha.sanPham.sp_id = :spId")
    fun deleteBySanPhamId(@Param("spId") spId: Long)
}