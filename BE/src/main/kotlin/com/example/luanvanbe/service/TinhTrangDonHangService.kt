package com.example.luanvanbe.service

import com.example.luanvanbe.model.TinhTrangDonHang
import com.example.luanvanbe.repository.TinhTrangDonHangRepo
import org.springframework.stereotype.Service

@Service
class TinhTrangDonHangService(
        val tinhTrangDonHangRepo: TinhTrangDonHangRepo
) {
    fun getAllTinhTrang(): List<TinhTrangDonHang>{
        return tinhTrangDonHangRepo.findAll()
    }
}