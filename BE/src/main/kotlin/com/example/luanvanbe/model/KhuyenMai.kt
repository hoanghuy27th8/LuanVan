package com.example.luanvanbe.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonIgnore
import lombok.AllArgsConstructor
import lombok.Getter
import lombok.NoArgsConstructor
import lombok.Setter
import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "khuyen_mai")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
data class KhuyenMai(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var gg_id: Long,
        var gg_ten: String? = null,
        @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
        var gg_ngaybatdau: Date,
        @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
        var gg_ngayketthuc: Date,
        var gg_mucgiamgia: Int,

        @OneToMany(mappedBy = "khuyenMai", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
        @JsonBackReference
        var list_sp: Collection<SanPham>? =null
)
