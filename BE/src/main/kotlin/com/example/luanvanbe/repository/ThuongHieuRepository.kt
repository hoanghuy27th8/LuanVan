package com.example.luanvanbe.repository

import com.example.luanvanbe.model.ThuongHieu
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ThuongHieuRepository : JpaRepository<ThuongHieu, Long> {
}