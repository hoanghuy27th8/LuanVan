package com.example.luanvanbe.controller

import com.example.luanvanbe.dto.SanPhamDTORequest
import com.example.luanvanbe.dto.SanPhamDTOResponseSug
import com.example.luanvanbe.model.SanPham
import com.example.luanvanbe.service.SanPhamService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.io.IOException

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = arrayOf("http://localhost:3000/"))
class SanPhamController (@Autowired val sanPhamService: SanPhamService) {

    @PostMapping("/san-pham")
    fun AddProduct(@RequestBody sanPhamDTORequest: SanPhamDTORequest) : ResponseEntity<SanPham>{
        return ResponseEntity(sanPhamService.addProduct(sanPhamDTORequest),HttpStatus.OK)
    }

    @GetMapping("/san-pham")
    fun getAll(): ResponseEntity<List<SanPham>>{
        return ResponseEntity.ok(sanPhamService.getAllProduct())
    }

    @GetMapping("/san-pham/{idSanPham}")
    fun getProductById(@PathVariable idSanPham: Long): ResponseEntity<SanPham>{
        return ResponseEntity.ok(sanPhamService.findPrductById(idSanPham))
    }

    @GetMapping("/san-pham/khuyen-mai")
    fun getSP(): ResponseEntity<List<SanPham>>{
        return ResponseEntity.ok(sanPhamService.getSanPhanKhuyenMai())
    }

    @GetMapping("/san-pham/dac-tinh/{idDacTinh}")
    fun getSanPhamByIdDacTinh(@PathVariable idDacTinh: Long): ResponseEntity<SanPhamDTOResponseSug>{
        return ResponseEntity.ok(sanPhamService.findProductsByIdDacTinh(idDacTinh))
    }

    @GetMapping("/san-pham/thuong-hieu/{idThuongHieu}")
    fun getSanPhamByThuongHieu(@PathVariable idThuongHieu: Long): ResponseEntity<List<SanPham>>{
        return ResponseEntity.ok(sanPhamService.findProductByIdThuongHieu(idThuongHieu))
    }

    @GetMapping("/search")
    fun getSanPhamByNameContais(@RequestParam("name") name: String): ResponseEntity<List<SanPham>>{
        return ResponseEntity.ok((sanPhamService.findProductByNameContais(name)))
    }

    @GetMapping("/san-pham/gia")
    fun getSanPhamByGia(
            @RequestParam("minPrice") minPrice: Long,
            @RequestParam("maxPrice") maxPrice: Long
    ):ResponseEntity<List<SanPham>>{
        return ResponseEntity.ok(sanPhamService.findPriductByGia(minPrice, maxPrice))
    }

    @GetMapping("/san-pham/het-hang")
    fun getSanPhamSoldOut(): ResponseEntity<List<SanPham>>{
        return  ResponseEntity.ok(sanPhamService.findProductSoldOut())
    }

    @GetMapping("/san-pham/dac-tinh/test")
    fun getDactinhs(@RequestBody list: List<Long>): ResponseEntity<Any>{
        return ResponseEntity.ok(sanPhamService.testDactinh(list))
    }

    @PutMapping("/san-pham/{idSanPham}")
    fun updateSanPham(@PathVariable idSanPham: Long, @RequestBody sanPhamDTORequest: SanPhamDTORequest): ResponseEntity<SanPham>{
        return ResponseEntity.ok((sanPhamService.updateProductById(idSanPham, sanPhamDTORequest)))
    }

    @DeleteMapping("/san-pham/{idSanPham}")
    fun deleteSanPHam(@PathVariable idSanPham: Long) : ResponseEntity<Unit>{
        return ResponseEntity(sanPhamService.deleteProductById(idSanPham), HttpStatus.NO_CONTENT)
    }


}