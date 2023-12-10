package com.example.luanvanbe.config.Security

import com.example.luanvanbe.model.TaiKhoan
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

data class UserDetails2 (val taiKhoan: TaiKhoan) : UserDetails {
    @Transient
    private val serialVersionUID = 1L

    override fun getAuthorities(): Collection<SimpleGrantedAuthority> {
        return listOf(SimpleGrantedAuthority("ROLE_${taiKhoan.tk_role}"))
    }

    override fun getPassword(): String? {
        return taiKhoan.tk_passWord
    }

    override fun getUsername(): String? {
        return taiKhoan.tk_userName
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

    fun getNhanVien(): Long{
        return taiKhoan.nhanVien!!.nv_id
    }
}