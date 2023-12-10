package com.example.luanvanbe.repository

import com.example.luanvanbe.model.DiaChiKhachHang
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DiaChiKhachHangRepo: JpaRepository<DiaChiKhachHang, Long> {
}