package com.example.luanvanbe.repository

import com.example.luanvanbe.model.KhuyenMai
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface KhuyenMaiRepository: JpaRepository<KhuyenMai, Long> {
}