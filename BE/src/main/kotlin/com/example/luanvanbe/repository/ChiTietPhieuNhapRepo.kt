package com.example.luanvanbe.repository

import com.example.luanvanbe.model.ChiTietPhieuNhap
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ChiTietPhieuNhapRepo : JpaRepository<ChiTietPhieuNhap, Long>{

}