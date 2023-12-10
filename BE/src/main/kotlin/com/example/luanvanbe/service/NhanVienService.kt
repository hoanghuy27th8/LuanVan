package com.example.luanvanbe.service

import com.example.luanvanbe.dto.NhanVienDTORequest
import com.example.luanvanbe.model.NhanVien
import com.example.luanvanbe.model.TaiKhoan
import com.example.luanvanbe.repository.NhanVienRepository
import com.example.luanvanbe.repository.TaiKhoanRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class NhanVienService(
    @Autowired val nhanVienRepository: NhanVienRepository,
    @Autowired val taiKhoanRepository: TaiKhoanRepository
) {
    fun addNewNhanVien(nhanVienDTORequest: NhanVienDTORequest): NhanVien{
        val taiKhoan = TaiKhoan(0, nhanVienDTORequest.taiKhoan, nhanVienDTORequest.matKhau, nhanVienDTORequest.vaiTro)
        taiKhoanRepository.save(taiKhoan)
        val nhanVien = NhanVien(
                nv_id = 0,
                nv_ten =  nhanVienDTORequest.hoTen,
                nv_diaChi = nhanVienDTORequest.diaChi,
                nv_email = nhanVienDTORequest.email,
                nv_gioiTinh = nhanVienDTORequest.gioiTinh,
                nv_namSinh = nhanVienDTORequest.ngaySinh,
                nv_sdt = nhanVienDTORequest.SDT,
                taiKhoan = taiKhoan
                )
        return nhanVienRepository.save(nhanVien)
    }

    fun getAllNhanVien(): List<NhanVien>{
        return nhanVienRepository.findAll()
    }

    fun getNhanVienById(idNhanVien: Long): NhanVien{
        return nhanVienRepository.findById(idNhanVien).get()
    }
}