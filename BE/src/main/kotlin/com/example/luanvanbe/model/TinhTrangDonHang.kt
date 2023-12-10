package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Table(name = "tinh_trang_don_hang")
data class TinhTrangDonHang(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var ttdh_id: Long = 0,
    var ttdh_ten: String? = null,

    @OneToMany(mappedBy = "tinhTrangDonHang", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonBackReference("tinhTrangDonHang-donHang")
    var donHangs: Set<DonHang>? = null
)
