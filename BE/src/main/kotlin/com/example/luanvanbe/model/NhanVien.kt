package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonManagedReference
import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "nhan_vien")
data class NhanVien(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var nv_id: Long =0,
    var nv_ten: String?=null,

    @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
    var nv_namSinh: Date,
    var nv_gioiTinh: String? = null,
    var nv_sdt: String? = null,
    var nv_email: String? = null,
    var nv_diaChi: String? = null,

    @OneToMany(mappedBy = "nhanVien", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonManagedReference("nhanVien-phieuNhap")
    var phieuNhaps: List<PhieuNhap>? = null,

    @OneToOne
    @JoinColumn(name = "taikhoan_id", referencedColumnName = "tk_id")
    @JsonManagedReference("nhanVien-taiKhoan")
    var taiKhoan: TaiKhoan
)
