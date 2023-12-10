package com.example.luanvanbe.config.Security

import com.example.luanvanbe.repository.TaiKhoanRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsService (val taiKhoanRepository: TaiKhoanRepository): UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val taiKhoan = taiKhoanRepository.findBytk_userName(username)
                ?:throw UsernameNotFoundException("Tài khoản không tồn tại")
        return com.example.luanvanbe.config.Security.UserDetails2(taiKhoan)
    }

}