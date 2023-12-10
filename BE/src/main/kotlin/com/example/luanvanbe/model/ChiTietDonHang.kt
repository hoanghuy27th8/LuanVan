package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
@Table(name = "chi_tiet_don_hang")
data class ChiTietDonHang(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var ctdh_id: Long = 0,
        var ctdh_soLuong: Int = 0,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "sanpham_id", referencedColumnName = "sp_id")
        @JsonManagedReference("chiTietDonHang-sanPham")
        var sanPham: SanPham? = null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "donhang_id", referencedColumnName = "dh_id")
        @JsonBackReference("chiTietDonHang-donHang")
        var donHang: DonHang? = null
)
