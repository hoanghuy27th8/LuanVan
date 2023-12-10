package com.example.luanvanbe.service

import com.example.luanvanbe.model.KhuyenMai
import com.example.luanvanbe.repository.KhuyenMaiRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.CrossOrigin
import java.time.LocalDateTime

@Service
class KhuyenMaiService(
        @Autowired val khuyenMaiRepository: KhuyenMaiRepository
) {

    fun createNewPromotion(khuyenMai: KhuyenMai): KhuyenMai{
        return khuyenMaiRepository.save(khuyenMai);
    }

    fun getAllPromotion(): List<KhuyenMai>{
        return khuyenMaiRepository.findAll()
    }

    fun getAPromotionById(id: Long): KhuyenMai{
        return khuyenMaiRepository.findById(id).get()
    }

    fun updatePromotionById(id: Long, khuyenMai: KhuyenMai): KhuyenMai{
        var existsPromotion = khuyenMaiRepository.findById(id).orElse(null)
        if(existsPromotion == null){
            throw RuntimeException("Khong tim thay khuyen mai co ID: "+id)
        }
        existsPromotion.gg_mucgiamgia = khuyenMai.gg_mucgiamgia
        existsPromotion.gg_ngaybatdau = khuyenMai.gg_ngaybatdau
        existsPromotion.gg_ngayketthuc = khuyenMai.gg_ngayketthuc
        existsPromotion.list_sp = khuyenMai.list_sp
        existsPromotion.gg_ten = khuyenMai.gg_ten

        var newPromotion = khuyenMaiRepository.save(existsPromotion)
        return newPromotion
    }

    fun deletePromotionById(id: Long): Unit{
        return khuyenMaiRepository.deleteById(id)
    }
}