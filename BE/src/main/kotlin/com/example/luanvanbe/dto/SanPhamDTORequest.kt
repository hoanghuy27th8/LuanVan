package com.example.luanvanbe.dto

class SanPhamDTORequest(
    var sp_ten: String,
    var sp_ram: String,
    var sp_cpu: String,
    var sp_manhinh: String,
    var sp_ocung: String,
    var sp_card: String,
    var sp_mota: String,
    var sp_gia: Long,
    var sp_soluong: Int,
    var thuonghieu: Long,
    var khuyenmai:Long?=null,
    var listIdDactinh: List<Long>?=null
) {
}