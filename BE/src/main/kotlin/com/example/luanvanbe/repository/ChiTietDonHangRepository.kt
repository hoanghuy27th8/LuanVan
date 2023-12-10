package com.example.luanvanbe.repository

import com.example.luanvanbe.model.ChiTietDonHang
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ChiTietDonHangRepository:JpaRepository<ChiTietDonHang, Long> {
}