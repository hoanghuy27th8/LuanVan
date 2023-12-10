package com.example.luanvanbe.controller

import com.example.luanvanbe.model.NhaCungCap
import com.example.luanvanbe.service.NhaCungCapService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/test")
class NhaCungCapController(
        @Autowired val nhaCungCapService: NhaCungCapService
) {

    @GetMapping("/nha-cung-cap")
    fun getAllSupplier(): ResponseEntity<List<NhaCungCap>>{
        return ResponseEntity.ok(nhaCungCapService.getAllSupplier())
    }

    @GetMapping("/nha-cung-cap/{id}")
    fun getSupplierById(@PathVariable id: Long): ResponseEntity<NhaCungCap>{
        return ResponseEntity.ok(nhaCungCapService.getSupplierById(id))
    }

    @PostMapping("/nha-cung-cap")
    fun addNewSupplier(@RequestBody nhaCungCap: NhaCungCap): ResponseEntity<NhaCungCap>{
        return ResponseEntity(nhaCungCapService.addNewSupplier(nhaCungCap), HttpStatus.CREATED)
    }

    @PutMapping("/nha-cung-cap/{id}")
    fun updateSupplier(@PathVariable id: Long, @RequestBody nhaCungCap: NhaCungCap): ResponseEntity<NhaCungCap>{
        return ResponseEntity.ok(nhaCungCapService.updateSuppolier(id, nhaCungCap))
    }

    @DeleteMapping("/nha-cung-cap/{id}")
    fun deleteSupplier(@PathVariable id: Long): ResponseEntity<Unit>{
        return  ResponseEntity(nhaCungCapService.deleteSupplierById(id), HttpStatus.NO_CONTENT)
    }
}
