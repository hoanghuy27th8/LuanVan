package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
@Table(name = "chi_tiet_phieu_nhap")
data class ChiTietPhieuNhap(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var ctpn_id: Long? = 0,
        var ctpn_soluong: Int,
        var ctpn_dongia: Long,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "sanpham_id" ,referencedColumnName = "sp_id")
        @JsonManagedReference
        var sanPham: SanPham,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "phieunhap_id" ,referencedColumnName = "pn_id")
        @JsonBackReference
        var phieuNhap: PhieuNhap
)
