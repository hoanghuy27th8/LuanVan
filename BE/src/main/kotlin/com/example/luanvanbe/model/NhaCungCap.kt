package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
@Table(name = "nha_cung_cap")
data class NhaCungCap(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var ncc_id: Long = 0,
        var ncc_ten: String? = null,
        var ncc_sdt: String? = null,
        var ncc_email: String? = null,

        @OneToMany(mappedBy = "nhaCungCap", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
        @JsonManagedReference
        var phieuNhaps: Collection<PhieuNhap>? = null
)
