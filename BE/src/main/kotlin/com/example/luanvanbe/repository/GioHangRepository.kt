package com.example.luanvanbe.repository

import com.example.luanvanbe.model.GioHang
import com.example.luanvanbe.model.KhachHang
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GioHangRepository: JpaRepository<GioHang, Long> {
}