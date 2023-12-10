package com.example.luanvanbe.dto

import com.example.luanvanbe.model.DacTinh
import com.example.luanvanbe.model.SanPham

class SanPhamDTOResponseSug(
    val dacTinh: DacTinh? = null,
    val listSP: List<SanPham> ?= null
) {
}