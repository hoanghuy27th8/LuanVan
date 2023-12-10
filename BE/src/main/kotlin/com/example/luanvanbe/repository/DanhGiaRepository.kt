package com.example.luanvanbe.repository

import com.example.luanvanbe.model.DanhGia
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface DanhGiaRepository: JpaRepository<DanhGia, Long> {

    @Query("select d from DanhGia d where d.donHang.dh_id = :idDonHang")
    fun findDanhGiaByDg_id(idDonHang: Long): List<DanhGia>

    @Query("select d from DanhGia d where d.sanPham.sp_id = :idSanPham order by d.dg_ngayDanhGia desc ")
    fun findDanhGiaBySp_id(idSanPham: Long): List<DanhGia>
}