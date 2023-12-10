package com.example.luanvanbe.repository

import com.example.luanvanbe.model.NhaCungCap
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface NhaCungCapRepository: JpaRepository<NhaCungCap, Long> {
}