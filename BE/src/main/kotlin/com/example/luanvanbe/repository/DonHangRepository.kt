package com.example.luanvanbe.repository

import com.example.luanvanbe.dto.ThongKeDonHangTheoThang
import com.example.luanvanbe.model.DonHang
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface DonHangRepository:JpaRepository<DonHang, Long> {

    @Query("SELECT d FROM DonHang d WHERE d.khachHang.kh_id = :idKhachHang order by d.dh_id desc ")
    fun findDonHangByKhachHangKh_id(idKhachHang:Long) : List<DonHang>

    @Query("SELECT d FROM DonHang d WHERE d.khachHang.kh_id = :idKhachHang AND d.dh_id = :idDonHang")
    fun findDonHangByKhachHangkh_idAAndAndDh_id(idKhachHang: Long, idDonHang: Long): DonHang

    @Query("SELECT MAX(dh_id) FROM DonHang ")
    fun findMaxOrderId(): Long

    @Query("select d from DonHang d where d.dh_id = :idDonHang")
    fun findDonHangById(idDonHang: Long): DonHang

    @Query("select new com.example.luanvanbe.dto.ThongKeDonHangTheoThang(date_format(d.dh_ngayDatHang, '%Y-%m')," +
            "sum(d.dh_tongGia))" +
            " from DonHang d" +
            " where date_format(d.dh_ngayDatHang, '%Y') = :nam " +
            " group by date_format(d.dh_ngayDatHang, '%Y-%m')" +
            " order by date_format(d.dh_ngayDatHang, '%Y-%m')")
    fun getTongTienByThangTrongNam(nam: String):List<ThongKeDonHangTheoThang>

}