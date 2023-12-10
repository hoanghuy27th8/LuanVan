package com.example.luanvanbe.repository

import com.example.luanvanbe.model.NhanVien
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface NhanVienRepository : JpaRepository<NhanVien, Long>{
}