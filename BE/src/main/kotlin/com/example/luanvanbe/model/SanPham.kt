package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
@Table(name = "SanPham")
data class SanPham(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var sp_id: Long,
        var sp_ten: String? = null,
        var sp_ram: String? = null,
        var sp_cpu: String? = null,
        var sp_manhinh: String? = null,
        var sp_ocung: String? = null,
        var sp_card: String? = null,
        var sp_mota: String? = null,
        var sp_gia: Long = 0,
        var sp_soluong: Int = 0,

        @ManyToOne
        @JoinColumn(name = "thuonghieu_id", referencedColumnName = "th_id")
        @JsonManagedReference
        var thuonghieu: ThuongHieu? = null,

        @ManyToOne
        @JsonManagedReference
        @JoinColumn(name = "khuyenmai_id", referencedColumnName = "gg_id")
        var khuyenMai: KhuyenMai? =null,

        @OneToMany(mappedBy = "sanPham", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
        @JsonBackReference("sanPham-hinhAnh")
        var list_anh: Collection<HinhAnh>? = null,

        @OneToMany(mappedBy = "sanPham", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonBackReference
        val chiTietPhieuNhaps: Collection<ChiTietPhieuNhap>? = null,

        @OneToMany(mappedBy = "sanPham", cascade =  [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonBackReference("gioHang-sanPham")
        val chiTietGioHang: Collection<ChiTietGioHang>? = null,

        @OneToMany(mappedBy = "sanPham", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonBackReference("donHang-sanPham")
        val chiTietDonHang: Collection<ChiTietDonHang>? = null,

        @OneToMany(mappedBy = "sanPham", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JsonBackReference("sanPham-danhGia")
        val danhGias: Set<DanhGia>? = null,

        @ManyToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JoinTable( name = "sanpham_dactinh",
                joinColumns = [JoinColumn(name = "sp_id")],
                inverseJoinColumns = [JoinColumn(name = "dt_id")]
                )
        var dacTinhs: List<DacTinh> ? = null,
)
