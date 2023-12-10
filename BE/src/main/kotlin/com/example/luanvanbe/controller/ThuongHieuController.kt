package com.example.luanvanbe.controller

import com.example.luanvanbe.model.ThuongHieu
import com.example.luanvanbe.service.ThuongHieuService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/test")
class ThuongHieuController (
        @Autowired val thuongHieuService: ThuongHieuService
) {

    @GetMapping("/thuong-hieu")
    fun getAllBrand(): ResponseEntity<List<ThuongHieu>>{
        return ResponseEntity(thuongHieuService.getAllBrand(), HttpStatus.OK)
    }

    @GetMapping("/thuong-hieu/{id}")
    fun getBrandById(@PathVariable id: Long): ResponseEntity<ThuongHieu>{
        return ResponseEntity.ok(thuongHieuService.getABrandById(id))
    }

    @PostMapping("/thuong-hieu")
    fun addNewBrand(@RequestBody thuonghieu: ThuongHieu): ResponseEntity<ThuongHieu>{
        return ResponseEntity(thuongHieuService.addNewBrand(thuonghieu), HttpStatus.CREATED)
    }

    @PutMapping("/thuong-hieu/{id}")
    fun updateBrand(@PathVariable id: Long, @RequestBody thuonghieu: ThuongHieu): ResponseEntity<ThuongHieu>{
        return ResponseEntity(thuongHieuService.updateBrandById(id, thuonghieu), HttpStatus.OK)
    }

    @DeleteMapping("/thuong-hieu")
    fun deleteBrand(@RequestParam("id") id:Long): ResponseEntity<Unit>{
        return  ResponseEntity(thuongHieuService.deleteBrandById(id), HttpStatus.NO_CONTENT)
    }
}