package com.example.luanvanbe.service

import com.example.luanvanbe.repository.TaiKhoanRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TaiKhoanService(
        @Autowired val taiKhoanRepository: TaiKhoanRepository
) {

}