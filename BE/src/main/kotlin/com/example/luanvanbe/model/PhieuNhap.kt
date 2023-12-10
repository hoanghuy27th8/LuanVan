package com.example.luanvanbe.model
import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import lombok.AllArgsConstructor
import lombok.NoArgsConstructor
import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "phieu_nhap")
@AllArgsConstructor
@NoArgsConstructor
data class PhieuNhap(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var pn_id: Long = 0,
        @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
        var pn_ngaynhaphang: Date? = null,

        @OneToMany(mappedBy = "phieuNhap", cascade = [CascadeType.ALL])
        @JsonManagedReference
        var chiTietPhieuNhaps: Collection<ChiTietPhieuNhap>? = null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "nhacungcap_id", referencedColumnName = "ncc_id")
        @JsonBackReference
        var nhaCungCap: NhaCungCap? =null,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "nhanvien_id", referencedColumnName = "nv_id")
        @JsonBackReference("phieuNhap-nhanVien")
        var nhanVien: NhanVien?=null
)
