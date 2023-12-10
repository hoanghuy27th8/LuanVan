package com.example.luanvanbe.service

import com.example.luanvanbe.model.ThuongHieu
import com.example.luanvanbe.repository.ThuongHieuRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ThuongHieuService (
        @Autowired val thuongHieuRepository: ThuongHieuRepository
) {
    fun addNewBrand (thuongHieu: ThuongHieu) : ThuongHieu{
        return thuongHieuRepository.save(thuongHieu)
    }

    fun getAllBrand() : List<ThuongHieu>{
        return thuongHieuRepository.findAll()
    }

    fun getABrandById( id: Long) : ThuongHieu{
        return thuongHieuRepository.findById(id).get()
    }

    fun updateBrandById(id: Long, thuonghieu: ThuongHieu): ThuongHieu{
        var existingBrand:ThuongHieu = thuongHieuRepository.findById(id).orElse(null)
        if (existingBrand == null){
            throw RuntimeException("Không tìm thấy thương hiệu với ID: "+id)

        }
        existingBrand.list_sp = thuonghieu.list_sp
        existingBrand.th_ten = thuonghieu.th_ten

        var newBrand:ThuongHieu = thuongHieuRepository.save(existingBrand)
        return newBrand
    }

    fun deleteBrandById(id: Long):Unit{
        return thuongHieuRepository.deleteById(id)
    }
}