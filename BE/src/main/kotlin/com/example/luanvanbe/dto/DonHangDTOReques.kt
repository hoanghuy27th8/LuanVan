package com.example.luanvanbe.dto

import com.example.luanvanbe.model.ChiTietDonHang
import com.example.luanvanbe.model.HinhThucThanhToan
import com.example.luanvanbe.model.SanPham
import com.fasterxml.jackson.annotation.JsonFormat
import java.util.*

class DonHangDTOReques(
    var idKhachHang: Long,
    var sanPhams: List<SanPhamGiaoDichDto>,
    var ghiChu: String?=null,
    var tinhTrangThanhToan: Boolean,
    @JsonFormat(pattern = "dd-MM-yyyy", timezone = "UTC")
    var ngayDatHang: Date,
    var idHinhThucThanhToan: Long,
    var idTinhTrangDonHang: Long,
    var diaChiGiaoHang: String
) {
}