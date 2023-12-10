package com.example.luanvanbe.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.util.*

class KhachHangDTO(
        var kh_id: Long = 0,
        var kh_ten: String? = null,
        @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
        var kh_namsinh: Date,
        var kh_gioitinh: String? = null,
        var kh_sdt: String? = null,
        var kh_emial: String? = null,
        var diaChi: String? = null,
        var userName: String? = null,
        var passWord: String? = null
) {
}