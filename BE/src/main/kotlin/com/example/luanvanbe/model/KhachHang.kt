package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonManagedReference
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "khach_hang")
data class KhachHang(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var kh_id: Long = 0,
        var kh_ten: String? = null,
        @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
        var kh_namsinh: Date,
        var kh_gioitinh: String? = null,
        var kh_sdt: String? = null,
        var kh_emial: String? = null,

        @OneToOne
        @JoinColumn(name = "giohang_id", referencedColumnName = "gh_id")
        @JsonBackReference("khachHang-gioHang")
        var gioHang: GioHang,

        @OneToMany(mappedBy = "khachHang", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonBackReference("donHang-khachHang")
        var donHang: Collection<DonHang>?=null,

        @OneToMany(mappedBy = "khachHang", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonManagedReference("khachHang-diaChi")
        var diaChiKhachHangs: Set<DiaChiKhachHang>? = null,

        @OneToOne
        @JoinColumn(name = "taikhoan_id", referencedColumnName = "tk_id")
        @JsonManagedReference("khachHang-taiKhoan")
        var taiKhoan: TaiKhoan
){
        override fun hashCode(): Int {
                return Objects.hash(kh_id) // Sử dụng một số thuộc tính cụ thể để tính toán hashCode
        }
}
