package com.example.luanvanbe.service

import com.example.luanvanbe.dto.SanPhamGiaoDichDto
import com.example.luanvanbe.model.ChiTietGioHang
import com.example.luanvanbe.model.GioHang
import com.example.luanvanbe.repository.ChiTietGioHangRepository
import com.example.luanvanbe.repository.GioHangRepository
import com.example.luanvanbe.repository.KhachHangRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class GioHangService(
        @Autowired val gioHangRepository: GioHangRepository,
        @Autowired val chiTietGioHangRepository: ChiTietGioHangRepository,
        @Autowired val khachHangRepository: KhachHangRepository
) {

    fun addProductIntoCart(idKhachHang: Long ,danhsachSanPham: List<SanPhamGiaoDichDto>) : GioHang{
        var khachHang = khachHangRepository.findById(idKhachHang).orElse(null)
        var gioHang = khachHang.gioHang
        if(khachHang.gioHang == null) {
            gioHang = GioHang()
            gioHangRepository.save(gioHang)
            khachHang.gioHang = gioHang
            khachHangRepository.save(khachHang)
        }
        for (sanPham in danhsachSanPham){
            var chiTietGioHang = gioHang.chiTietGioHang?.find { it.sanPham!!.sp_id == sanPham.sanPham.sp_id }
            if(chiTietGioHang != null){
                chiTietGioHang.ctgh_soLuong += sanPham.soLuong
                chiTietGioHangRepository.save(chiTietGioHang)
            }else {
                chiTietGioHang = ChiTietGioHang(
                        ctgh_id = null,
                        ctgh_soLuong = sanPham.soLuong,
                        sanPham = sanPham.sanPham,
                        gioHang = gioHang,
                )
                chiTietGioHangRepository.save(chiTietGioHang)
            }
            gioHang.gh_tongSL += sanPham.soLuong
            gioHang.gh_tongGia += sanPham.donGia*sanPham.soLuong
        }
        gioHangRepository.save(gioHang)
        return gioHang
    }

    fun getAllProductInCart():List<GioHang>{
        return gioHangRepository.findAll()
    }

    @Transactional
    fun deleteProductOutCart(idKhachHang: Long, sanphamId: Long): GioHang{
        val khachHang = khachHangRepository.findById(idKhachHang).get()
        var gioHang = khachHang.gioHang
        if(gioHang != null){
            val chiTietGioHang = chiTietGioHangRepository.findBySanPhamIdAndGioHangId(sanphamId, gioHang.gh_id)
            if(chiTietGioHang != null){
                val newChiTietGioHang = gioHang.chiTietGioHang?.filter { it.ctgh_id != chiTietGioHang.ctgh_id }
                gioHang.chiTietGioHang = newChiTietGioHang
                gioHang.gh_tongSL = tinhTongSoLuongTrongGioHang(gioHang).toLong()
                gioHang.gh_tongGia = tinhTongTienGioHang(gioHang).toLong()
                chiTietGioHangRepository.delete(chiTietGioHang)
                gioHangRepository.save(gioHang)
                khachHang.gioHang = gioHang
                khachHangRepository.save(khachHang)
            }
        }
        return gioHang
    }

    fun updateQuantityProductInCart(idKhachHang: Long, sanphamId: Long, soLuongMoi: Int): GioHang{
        val gioHang = khachHangRepository.findById(idKhachHang).get().gioHang
        val chiTietGioHang = chiTietGioHangRepository.findBySanPhamIdAndGioHangId(sanphamId, gioHang.gh_id)

        if(gioHang!= null && chiTietGioHang!=null){
            chiTietGioHang.ctgh_soLuong = soLuongMoi
            chiTietGioHangRepository.save(chiTietGioHang)

            gioHang.gh_tongGia = tinhTongTienGioHang(gioHang).toLong()
            gioHang.gh_tongSL = tinhTongSoLuongTrongGioHang(gioHang).toLong()
            gioHangRepository.save(gioHang)
        }
        return gioHang
    }
    private fun tinhTongSoLuongTrongGioHang(gioHang: GioHang): Int{
        var soLuong = 0
        for (chitiet in gioHang.chiTietGioHang!!){
            soLuong += chitiet.ctgh_soLuong
        }
        return soLuong
    }
    private fun tinhTongTienGioHang(gioHang: GioHang): Double {
        var tongTien = 0.0
        for (chiTiet in gioHang.chiTietGioHang!!) {
            if(chiTiet.sanPham?.khuyenMai == null){
                tongTien += (chiTiet.sanPham?.sp_gia ?: 0) * chiTiet.ctgh_soLuong
            }else{
                var tiengiam = chiTiet.sanPham!!.sp_gia * chiTiet.sanPham!!.khuyenMai!!.gg_mucgiamgia/100
                tongTien += (chiTiet.sanPham!!.sp_gia - tiengiam) * chiTiet.ctgh_soLuong
            }
        }
        return tongTien
    }
}