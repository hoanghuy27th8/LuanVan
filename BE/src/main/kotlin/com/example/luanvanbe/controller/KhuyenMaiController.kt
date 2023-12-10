package com.example.luanvanbe.controller

import com.example.luanvanbe.model.KhuyenMai
import com.example.luanvanbe.service.KhuyenMaiService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/test")
@CrossOrigin("http://localhost:3000/")
class KhuyenMaiController(
        @Autowired val khuyenMaiService: KhuyenMaiService
) {

    @GetMapping("/khuyen-mai")
    fun getAllPromotion(): ResponseEntity<List<KhuyenMai>>{
        return ResponseEntity.ok(khuyenMaiService.getAllPromotion())
    }

    @GetMapping("/khuyen-mai/{id}")
    fun getAPromotionById(@PathVariable id:Long): ResponseEntity<KhuyenMai>{
        return ResponseEntity.ok(khuyenMaiService.getAPromotionById(id))
    }

    @PostMapping("/khuyen-mai")
    fun addNewPromotion(@RequestBody khuyenMai: KhuyenMai): ResponseEntity<KhuyenMai>{
        return ResponseEntity(khuyenMaiService.createNewPromotion(khuyenMai), HttpStatus.CREATED)
    }

    @PutMapping("/khuyen-mai/{id}")
    fun updatePromotionById(@PathVariable id:Long, @RequestBody khuyenMai: KhuyenMai): ResponseEntity<KhuyenMai>{
        return ResponseEntity.ok(khuyenMaiService.updatePromotionById(id, khuyenMai))
    }

    @DeleteMapping("/khuyen-mai/{id}")
    fun deletePromotion(@PathVariable id:Long) :ResponseEntity<Unit>{
        return ResponseEntity(khuyenMaiService.deletePromotionById(id), HttpStatus.NO_CONTENT)
    }
}