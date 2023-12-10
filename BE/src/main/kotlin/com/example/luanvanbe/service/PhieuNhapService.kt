package com.example.luanvanbe.service

import com.example.luanvanbe.dto.SanPhamGiaoDichDto
import com.example.luanvanbe.model.ChiTietPhieuNhap
import com.example.luanvanbe.model.PhieuNhap
import com.example.luanvanbe.repository.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.Date

@Service
class PhieuNhapService (
        @Autowired val chiTietPhieuNhapRepo: ChiTietPhieuNhapRepo,
        @Autowired val sanPhamRepository: SanPhamRepository,
        @Autowired val phieuNhapRepository: PhieuNhapRepository,
        @Autowired val nhanVienRepository: NhanVienRepository,
        @Autowired val nhaCungCapRepository: NhaCungCapRepository
) {

    fun taoPhieuNhapMoi(idNhanVien: Long, idNhaCungCap: Long,ngayNhap: Date, danhsachSanPham: List<SanPhamGiaoDichDto>): PhieuNhap{
        val nhanVien = nhanVienRepository.findById(idNhanVien).orElse(null)
        val nhacc = nhaCungCapRepository.findById(idNhaCungCap).orElse(null)
        val phieuNhap = PhieuNhap()
        phieuNhap.nhaCungCap = nhacc
        phieuNhap.nhanVien = nhanVien
        phieuNhap.pn_ngaynhaphang = ngayNhap
        phieuNhapRepository.save(phieuNhap)

        for (sanpham in danhsachSanPham){
            val sanPham = sanpham.sanPham
            val dongia = sanpham.donGia
            val soluong = sanpham.soLuong

            val chiTietPhieuNhap = ChiTietPhieuNhap(
                    ctpn_id = null,
                    ctpn_dongia = dongia,
                    ctpn_soluong = soluong,
                    sanPham = sanPham,
                    phieuNhap = phieuNhap
            )
            chiTietPhieuNhapRepo.save(chiTietPhieuNhap)

            val soluongTonMoi = sanPham.sp_soluong + soluong
            sanPham.sp_soluong = soluongTonMoi
            sanPhamRepository.save(sanPham)
        }
        return phieuNhap
    }

    fun getDataPhieuNhap(id: Long): PhieuNhap{
        return phieuNhapRepository.findById(id).get()
    }
}