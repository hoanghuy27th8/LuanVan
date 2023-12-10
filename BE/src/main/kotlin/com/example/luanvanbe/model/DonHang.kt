package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonManagedReference
import lombok.AllArgsConstructor
import lombok.NoArgsConstructor
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "don_hang")
@NoArgsConstructor
@AllArgsConstructor
data class DonHang(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var dh_id: Long = 0,
        var dh_tongGia: Long = 0,
        var dh_ghiChu: String? = null,
        var dh_tinhTrangThanhToan:Boolean = true,
        @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
        var dh_ngayDatHang: Date,
        @Column(name = "dh_dia_chi_giao_hang")
        var dh_diaChiGiaoHaang: String? =null,

        @OneToMany(mappedBy = "donHang", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonManagedReference("donHang-chiTietDonHang")
        var chiTietDonHang: Collection<ChiTietDonHang>?=null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "khachhang_id", referencedColumnName = "kh_id")
        @JsonManagedReference("donHang-khachHang")
        var khachHang: KhachHang?=null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "hinhthucthanhtoan_id", referencedColumnName = "httt_id")
        @JsonManagedReference("donHang-hinhThucThanhToan")
        var hinhThucThanhToan: HinhThucThanhToan ? = null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "tinhtrangdonhang_id", referencedColumnName = "ttdh_id")
        @JsonManagedReference("donHang- tinhTrangDonHang")
        var tinhTrangDonHang: TinhTrangDonHang ?=null,

        @OneToMany(mappedBy = "donHang", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonBackReference("donHang-danhGia")
        var danhGias: Set<DanhGia>? = null
) {
}
