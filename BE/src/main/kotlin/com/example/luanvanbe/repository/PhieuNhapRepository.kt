package com.example.luanvanbe.repository

import com.example.luanvanbe.model.PhieuNhap
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PhieuNhapRepository: JpaRepository<PhieuNhap, Long> {
}