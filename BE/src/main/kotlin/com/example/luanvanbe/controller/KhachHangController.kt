package com.example.luanvanbe.controller

import com.example.luanvanbe.config.Security.LoginRequest
import com.example.luanvanbe.dto.KhachHangDTO
import com.example.luanvanbe.model.GioHang
import com.example.luanvanbe.model.KhachHang
import com.example.luanvanbe.service.KhachHangService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = arrayOf("http://localhost:3000"))
class KhachHangController(
        @Autowired val khachHangService: KhachHangService
) {
//   Show gior hàng theo id khách hàng
    @GetMapping("/gio-hang/{idKhachHang}")
    fun getCartByIdKhachHang(@PathVariable idKhachHang: Long):ResponseEntity<GioHang>{
        return ResponseEntity.ok(khachHangService.getCartById(idKhachHang))
    }
//    Xem thông tin khách hàng dựa trên idKhachHang
    @GetMapping("/thong-tin/{idKhachHang}")
    fun getDetaisInFoCustomer(@PathVariable idKhachHang: Long): ResponseEntity<KhachHang>{
        return ResponseEntity.ok(khachHangService.getDetailInFoCustormer(idKhachHang))
    }

//Tạo tài khoản khách hàng
    @PostMapping("/dang-ky-tai-khoan")
    fun createNewKhachHang(@RequestBody khachHangDTO: KhachHangDTO): ResponseEntity<KhachHang>{
        return ResponseEntity(khachHangService.createNewCustormer(khachHangDTO), HttpStatus.CREATED)
    }
//Cập nhật thông tin khách hàng
    @PutMapping("/cap-nhat-thong-tin/{idKhachHang}")
    fun updateInForCustormer(@PathVariable idKhachHang: Long, @RequestBody khachHangDTO: KhachHangDTO): ResponseEntity<KhachHang>{
        return ResponseEntity.ok(khachHangService.updateCustormer(idKhachHang, khachHangDTO))
    }
//Vô hiệu tài khoản
    @DeleteMapping("/thong-tin/{idKhachHang}")
    fun deleteCustormer(@PathVariable idKhachHang: Long): ResponseEntity<Unit>{
        return ResponseEntity(khachHangService.deteleCustormer(idKhachHang),HttpStatus.NO_CONTENT)
    }

//    Thêm địa chỉ cho khách hàng
    @PostMapping("/thong-tin/dia-chi")
    fun addNewAddress(@RequestBody khachHangDTO: KhachHangDTO): ResponseEntity<KhachHang>{
        return ResponseEntity.ok(khachHangService.addNewAddressCustormer(khachHangDTO))
    }
//    Xoa dia chi
    @DeleteMapping("/thong-tin/{idKhachHang}/dia-chi/{idDiaChi}")
    fun deleteAddress(@PathVariable idKhachHang: Long, @PathVariable idDiaChi: Long): ResponseEntity<KhachHang>{
        return ResponseEntity.ok(khachHangService.deleteAddressCustormer(idKhachHang, idDiaChi))
    }


}