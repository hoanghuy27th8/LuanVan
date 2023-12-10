package com.example.luanvanbe.config.Security

import com.example.luanvanbe.config.Security.JWT.JwtTokenProvider
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
class LoginController (
        val authenticationManager: AuthenticationManager,
        val jwtTokenProvider: JwtTokenProvider
){
    @PostMapping("/api/login")
    fun handleLoginRequest (@RequestBody loginRequest: LoginRequest): ResponseEntity<Any>{
        val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password)
        )

        SecurityContextHolder.getContext().authentication = authentication
        val userDetails = authentication.principal as UserDetails
        val token = jwtTokenProvider.generateToken(userDetails)
        val role = userDetails.authorities
        val userAuth = authentication.principal as UserDetails2
        val userLogin = userAuth.taiKhoan
        var userNotNull: Any? = null
        if(userLogin.nhanVien == null ){
            userNotNull = userLogin.khachHang
        }else userNotNull = userLogin.nhanVien

        return ResponseEntity.ok(mapOf("token" to token, "role" to role, "user" to userNotNull))
    }
}