package com.example.luanvanbe.service

import com.example.luanvanbe.config.Security.LoginRequest
import com.example.luanvanbe.dto.KhachHangDTO
import com.example.luanvanbe.model.DiaChiKhachHang
import com.example.luanvanbe.model.GioHang
import com.example.luanvanbe.model.KhachHang
import com.example.luanvanbe.model.TaiKhoan
import com.example.luanvanbe.repository.DiaChiKhachHangRepo
import com.example.luanvanbe.repository.GioHangRepository
import com.example.luanvanbe.repository.KhachHangRepository
import com.example.luanvanbe.repository.TaiKhoanRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException

@Service
class KhachHangService (
        @Autowired val khachHangRepository: KhachHangRepository,
        @Autowired val gioHangRepository: GioHangRepository,
        @Autowired val diaChiKhachHangRepo: DiaChiKhachHangRepo,
        @Autowired val taiKhoanRepository: TaiKhoanRepository,
        val passwordEncoder: BCryptPasswordEncoder
) {
    fun getCartById(idKhachHang: Long): GioHang{
        var idCart: Long = khachHangRepository.findById(idKhachHang).get().gioHang.gh_id
        return gioHangRepository.findById(idCart).get()
    }

    fun createNewCustormer(khachHangDTO: KhachHangDTO): KhachHang{
        val gioHang = GioHang()
        gioHangRepository.save(gioHang)
        val passwordMaHoa = passwordEncoder.encode(khachHangDTO.passWord)
        val taiKhoan = TaiKhoan(0, khachHangDTO.userName, passwordMaHoa, "USER", null, null)
        taiKhoanRepository.save(taiKhoan)
        var khachHang = KhachHang(
                khachHangDTO.kh_id,
                khachHangDTO.kh_ten,
                khachHangDTO.kh_namsinh,
                khachHangDTO.kh_gioitinh,
                khachHangDTO.kh_sdt,
                khachHangDTO.kh_emial,
                gioHang,
                null, null,
                taiKhoan
            )
        var diaChiKhachHang = DiaChiKhachHang(                                                                                                                                                                  0, khachHangDTO.diaChi, khachHang)
        khachHang.diaChiKhachHangs = setOf(diaChiKhachHang)
        return khachHangRepository.save(khachHang)
    }

    fun updateCustormer(idKhachHang: Long ,khachHangDTO: KhachHangDTO): KhachHang{
        var khachHangOld = khachHangRepository.findById(idKhachHang).orElse(null)
        if(khachHangOld != null){
            khachHangOld.gioHang = khachHangOld.gioHang
            khachHangOld.kh_id = khachHangOld.kh_id
            khachHangOld.kh_ten = khachHangDTO.kh_ten
            khachHangOld.kh_namsinh = khachHangDTO.kh_namsinh
            khachHangOld.kh_emial = khachHangDTO.kh_emial
            khachHangOld.kh_gioitinh = khachHangDTO.kh_gioitinh
            khachHangOld.kh_sdt = khachHangDTO.kh_sdt
        }
        var khachHangNew = khachHangRepository.save(khachHangOld)
        return khachHangNew
    }

    fun getDetailInFoCustormer(idKhachHang: Long): KhachHang{
        return khachHangRepository.findById(idKhachHang).get()
    }

    fun deteleCustormer(idKhachHang: Long): Unit{
        return khachHangRepository.deleteById(idKhachHang)
    }

// Thêm địa chỉ mới vào danh sách địa chỉ của khách hàng
    fun addNewAddressCustormer(khachHangDTO: KhachHangDTO): KhachHang{
        var khachHang = khachHangRepository.findById(khachHangDTO.kh_id).orElse(null)
        if (khachHang == null){
            throw EntityNotFoundException("Khong tim thay khach hang co id: "+ khachHangDTO.kh_id)
        }
        val diaChiMoi = DiaChiKhachHang(0, khachHangDTO.diaChi, khachHang)
        diaChiKhachHangRepo.save(diaChiMoi)
        val mutableSet = khachHang.diaChiKhachHangs?.toMutableSet() ?: mutableSetOf()
        mutableSet.add(diaChiMoi)
        khachHang.diaChiKhachHangs = mutableSet.toSet()

        return khachHangRepository.save(khachHang)
    }

// Xóa địa chir ra khỏi danh sách địa chỉ
    fun deleteAddressCustormer(idKhachHang: Long, idDiaChi: Long):KhachHang{
        var khachHang = khachHangRepository.findById(idKhachHang).orElse(null)
        var diaChi = diaChiKhachHangRepo.findById(idDiaChi).orElse(null)
        if (khachHang == null || diaChi == null){
            throw EntityNotFoundException("Khong tim thay khach hang co id: "+ idKhachHang + "va co dia chi id: "+idDiaChi)
        }
        diaChiKhachHangRepo.deleteById(idDiaChi)
        return khachHang
    }

}