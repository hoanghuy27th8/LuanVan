package com.example.luanvanbe.repository

import com.example.luanvanbe.model.DacTinh
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface DacTinhRepository : JpaRepository<DacTinh, Long> {

    @Query("select d from DacTinh d where d.dt_id= :dtID")
    fun findDacTinhByDt_id(dtID: Long): DacTinh


}