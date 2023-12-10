package com.example.luanvanbe.repository

import com.example.luanvanbe.model.TaiKhoan
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface TaiKhoanRepository: JpaRepository<TaiKhoan, Long> {
    @Query("select t from TaiKhoan t where t.tk_userName = :username")
    fun findBytk_userName(username: String): TaiKhoan

    @Query("select  t from TaiKhoan t where t.tk_id = :idTaiKhoan")
    fun findByTk_id(idTaiKhoan: Long): TaiKhoan
}