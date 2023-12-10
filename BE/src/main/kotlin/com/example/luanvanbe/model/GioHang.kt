package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonManagedReference
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "gio_hang")
data class GioHang(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var gh_id: Long = 0,
        var gh_tongGia: Long = 0,
        var gh_tongSL: Long = 0,

        @OneToMany(mappedBy = "gioHang", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonManagedReference
        var chiTietGioHang: Collection<ChiTietGioHang>? = null,

        @OneToOne(mappedBy = "gioHang")
        @JsonManagedReference("gioHang-khachHang")
        var khachHang: KhachHang? = null
){
        override fun hashCode(): Int {
                return Objects.hash(gh_id) // Sử dụng một số thuộc tính cụ thể để tính toán hashCode
        }
}
