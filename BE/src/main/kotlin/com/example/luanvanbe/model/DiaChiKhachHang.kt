package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Table(name = "dia_chi_khach_hang")
data class DiaChiKhachHang(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var dckh_id: Long = 0,
    var dchk_tenDiaChi: String?= null,

    @ManyToOne
    @JoinColumn(name = "khachhang_id", referencedColumnName = "kh_id")
    @JsonBackReference("diaChi-khachHang")
    var khachHang: KhachHang
)
