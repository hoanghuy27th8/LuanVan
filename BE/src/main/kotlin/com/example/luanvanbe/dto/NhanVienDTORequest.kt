package com.example.luanvanbe.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.util.*

class NhanVienDTORequest(
        var hoTen: String,
        @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
        var ngaySinh: Date,
        var gioiTinh: String,
        var email: String,
        var SDT: String,
        var diaChi: String,
        var taiKhoan: String,
        var matKhau: String,
        var vaiTro: String
) {
}