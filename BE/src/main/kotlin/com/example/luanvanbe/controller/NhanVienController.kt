package com.example.luanvanbe.controller

import com.example.luanvanbe.dto.NhanVienDTORequest
import com.example.luanvanbe.model.NhanVien
import com.example.luanvanbe.service.NhanVienService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.xml.ws.Response

@RestController
@RequestMapping("/api/test")
class NhanVienController(
    @Autowired val nhanVienService: NhanVienService
) {

    @PostMapping("/nhan-vien")
    fun addNewNhanVien(@RequestBody nhanVienDTORequest: NhanVienDTORequest): ResponseEntity<NhanVien>{
        return ResponseEntity(nhanVienService.addNewNhanVien(nhanVienDTORequest), HttpStatus.CREATED)
    }

    @GetMapping("/nhan-vien")
    fun getAllNhanVien(): ResponseEntity<List<NhanVien>>{
        return ResponseEntity.ok(nhanVienService.getAllNhanVien())
    }

    @GetMapping("/nhan-vien/{idNhanVien}")
    fun getANhanVienById(@PathVariable idNhanVien: Long): ResponseEntity<NhanVien>{
        return ResponseEntity.ok(nhanVienService.getNhanVienById(idNhanVien))
    }


}