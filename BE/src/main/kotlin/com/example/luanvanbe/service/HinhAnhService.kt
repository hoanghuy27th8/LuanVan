package com.example.luanvanbe.service

import com.example.luanvanbe.model.HinhAnh
import com.example.luanvanbe.model.SanPham
import com.example.luanvanbe.repository.HinhAnhRepository
import com.example.luanvanbe.repository.SanPhamRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class HinhAnhService (@Autowired val hinhAnhRepository: HinhAnhRepository,
                      private val sanPhamService: SanPhamService){


    fun postMultipleImages(images: List<MultipartFile>, sanpham: SanPham): ResponseEntity<List<HinhAnh>> {
        val hinhAnhs = mutableListOf<HinhAnh>()
        for (image in images) {
            val hinhAnh = HinhAnh(
                    ha_data = image.bytes,
                    sanPham = sanpham
            )
            hinhAnhs.add(hinhAnh)
        }
        val savedHinhAnhs = hinhAnhRepository.saveAll(hinhAnhs)
        return ResponseEntity.ok(savedHinhAnhs)
    }

    fun getListImagesByProductId(productID : Long): List<HinhAnh> {
        var sanpham = sanPhamService.findPrductById(productID)
        return hinhAnhRepository.findHinhAnhBySanPham(sanpham)
    }

    fun getAllHinhAnh(): List<HinhAnh>{
        return hinhAnhRepository.findAll()
    }
}