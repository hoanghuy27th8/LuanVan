package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
@Table(name = "chi_tiet_gio_hang")
data class ChiTietGioHang(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var ctgh_id: Long? = 0,
        var ctgh_soLuong: Int = 0,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "sanpham_id" ,referencedColumnName = "sp_id")
        @JsonManagedReference("chiTietGioHang-sanPham")
        var sanPham: SanPham? = null,

        @ManyToOne(fetch =  FetchType.LAZY)
        @JoinColumn(name = "giohang_id", referencedColumnName = "gh_id")
        @JsonBackReference()
        var gioHang: GioHang? =null
)
