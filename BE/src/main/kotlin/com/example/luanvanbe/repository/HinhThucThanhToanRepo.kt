package com.example.luanvanbe.repository

import com.example.luanvanbe.model.HinhThucThanhToan
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface HinhThucThanhToanRepo: JpaRepository<HinhThucThanhToan, Long> {
}