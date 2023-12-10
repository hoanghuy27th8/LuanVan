package com.example.luanvanbe.repository

import com.example.luanvanbe.model.SanPham
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface SanPhamRepository: JpaRepository<SanPham, Long> {
    fun findSanPhamByKhuyenMaiIsNotNull() : List<SanPham>

    @Query("select s from SanPham s join s.dacTinhs d where d.dt_id = :dtId")
    fun findSanPhamByDacTinhs_Id(dtId: Long): List<SanPham>

    @Query("SELECT s FROM SanPham s WHERE s.sp_ten LIKE %:ten%")
    fun findSanPhamBySp_tenContains(@Param("ten") ten: String): List<SanPham>

    @Query("select s from SanPham s WHERE s.thuonghieu.th_id = :idThuongHieu")
    fun findSanPhamByThuonghieuTh_id(idThuongHieu: Long): List<SanPham>

    @Query("select s from SanPham s where s.sp_gia >= :minPrice and s.sp_gia <= :maxPrice")
    fun findSanPhamByGia(minPrice: Long, maxPrice: Long): List<SanPham>

    @Query("select s from SanPham s where s.sp_soluong<= 20")
    fun findSanPhamBySoldOut(): List<SanPham>

    @Modifying
    @Transactional
    @Query("delete from SanPham s where s.sp_id = :id")
    fun deleteSanPhamById(@Param("id") id: Long): Unit
}

