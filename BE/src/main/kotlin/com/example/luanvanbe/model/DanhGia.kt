package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "danh_gia")
data class DanhGia(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var dg_id: Long = 0,
    var dg_noiDung: String? = null,
    @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
    var dg_ngayDanhGia: Date? = null,

    @ManyToOne
    @JoinColumn(name = "donhang_id", referencedColumnName = "dh_id")
    @JsonManagedReference("danhGia-donHang")
    var donHang: DonHang,

    @ManyToOne
    @JoinColumn(name = "sanpham_id", referencedColumnName = "sp_id")
    @JsonManagedReference("danhGia-sanPham")
    var sanPham: SanPham
)
