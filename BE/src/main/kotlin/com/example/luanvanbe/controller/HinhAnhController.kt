package com.example.luanvanbe.controller

import com.example.luanvanbe.model.HinhAnh
import com.example.luanvanbe.repository.HinhAnhRepository
import com.example.luanvanbe.repository.SanPhamRepository
import com.example.luanvanbe.service.HinhAnhService
import com.example.luanvanbe.service.SanPhamService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Repository
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.util.*

@RestController
@RequestMapping("/api/test")
class HinhAnhController (
        @Autowired val hinhAnhService: HinhAnhService,
        @Autowired val sanPhamService: SanPhamService
) {
    @PostMapping("/haha")
    fun helo(@RequestParam("ten") ten: String): ResponseEntity<String>{
        return ResponseEntity("Xin chao"+ten ,HttpStatus.OK)
    }

    @PostMapping("/post-img")
    fun postImagesProduct(
            @RequestPart(name="images") images: List<MultipartFile>,
            @RequestParam(name = "sanPhamid") sanPhamID: Long
    ): ResponseEntity<List<HinhAnh>>{
        val sanpham = sanPhamService.findPrductById(sanPhamID)
        return hinhAnhService.postMultipleImages(images, sanpham)
    }

    @GetMapping("/images")
    fun getImagesProduct(@RequestParam("sanphamID") sanPhamId: Long):ResponseEntity<List<String>>{
        val imgs = mutableListOf<String>()
        val list_anh = hinhAnhService.getListImagesByProductId(sanPhamId)
        for (item in list_anh){
            item.ha_data?.let {
                val base64Image = Base64.getEncoder().encodeToString(it)
                imgs.add(base64Image)
            }
        }
        return ResponseEntity.ok()
                .body(imgs)
    }

    @GetMapping("/hinh-anh")
    fun getALLhinhANh(): ResponseEntity<List<HinhAnh>> = ResponseEntity.ok(hinhAnhService.getAllHinhAnh())

}