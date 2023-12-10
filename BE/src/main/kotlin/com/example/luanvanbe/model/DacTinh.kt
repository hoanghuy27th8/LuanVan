package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import javax.persistence.*

@Entity
@Table(name = "dac_tinh")
data class DacTinh(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dt_id: Long,
    val dt_ten: String ? = null,

    @ManyToMany(mappedBy = "dacTinhs")
    @JsonIgnore
    val sanPhams: Set<SanPham> ? = null
)
