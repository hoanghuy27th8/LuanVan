package com.example.luanvanbe.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.util.Date

class DanhGiaDTORequest(
    var noiDung: String,
    @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
    var ngayDanhGia: Date
)
