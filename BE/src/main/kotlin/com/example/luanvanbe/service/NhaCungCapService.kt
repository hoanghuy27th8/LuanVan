package com.example.luanvanbe.service

import com.example.luanvanbe.model.NhaCungCap
import com.example.luanvanbe.repository.NhaCungCapRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class NhaCungCapService(
        @Autowired val nhaCungCapRepository: NhaCungCapRepository
) {
    fun addNewSupplier(nhaCungCap: NhaCungCap): NhaCungCap{
        return nhaCungCapRepository.save(nhaCungCap)
    }

    fun getAllSupplier(): List<NhaCungCap> = nhaCungCapRepository.findAll()

    fun getSupplierById(id: Long): NhaCungCap = nhaCungCapRepository.findById(id).get()

    fun updateSuppolier(id: Long, nhaCungCap: NhaCungCap): NhaCungCap{
        var existingSupplier = nhaCungCapRepository.findById(id).orElse(null)
        if(existingSupplier == null){
            throw  RuntimeException("Khong tim thay nha cung cap co ID: "+id)
        }
        existingSupplier.ncc_id = nhaCungCap.ncc_id
        existingSupplier.ncc_email = nhaCungCap.ncc_email
        existingSupplier.ncc_ten = nhaCungCap.ncc_ten
        existingSupplier.ncc_sdt = nhaCungCap.ncc_sdt

        var newSupplier = nhaCungCapRepository.save(existingSupplier)
        return newSupplier
    }

    fun deleteSupplierById(id: Long): Unit{
        nhaCungCapRepository.deleteById(id)
    }
}