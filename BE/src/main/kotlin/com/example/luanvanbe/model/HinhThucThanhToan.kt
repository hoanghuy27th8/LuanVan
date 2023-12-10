package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Table(name = "hinh_thuc_thanh_toan")
data class HinhThucThanhToan(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var httt_id: Long = 0,
    var httt_ten:String ?= null,

    @OneToMany(mappedBy = "hinhThucThanhToan", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonBackReference("hinhThucThanhToan-donHang")
    var donHangs: Set<DonHang> ? = null
) {
}