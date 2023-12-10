package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import lombok.NoArgsConstructor
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.Lob
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "HinhAnh")
@NoArgsConstructor
data class HinhAnh(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var ha_id: Long? = null ,
        @Lob
        var ha_data: ByteArray? = null,

        @ManyToOne
        @JoinColumn(name = "sp_id" , referencedColumnName ="sp_id",)
        @JsonManagedReference("hinhAnh-sanPham")
        var sanPham: SanPham?=null
)
