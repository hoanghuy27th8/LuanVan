package com.example.luanvanbe.repository

import com.example.luanvanbe.model.TinhTrangDonHang
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface TinhTrangDonHangRepo: JpaRepository<TinhTrangDonHang, Long> {

}