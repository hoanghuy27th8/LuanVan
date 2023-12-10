package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "ThuongHieu")
data class ThuongHieu(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var th_id: Long,
        var th_ten: String? = null,

        @OneToMany(mappedBy = "thuonghieu", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
        @JsonBackReference
        var list_sp: Collection<SanPham>? =null
)
