package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Table(name = "tai_khoan")
data class TaiKhoan(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var tk_id: Long = 0,
        var tk_userName: String?=null,
        var tk_passWord: String?=null,
        var tk_role: String?=null,

        @OneToOne(mappedBy = "taiKhoan", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonBackReference("taiKhoan-nhanVien")
        var nhanVien: NhanVien? =null,

        @OneToOne(mappedBy = "taiKhoan", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonBackReference("taiKhoan-khachHang")
        var khachHang: KhachHang? = null
)
