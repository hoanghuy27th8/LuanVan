package com.example.luanvanbe.config.Security.JWT

import com.example.luanvanbe.config.Security.UserDetails2
import org.springframework.security.core.userdetails.UserDetails
import com.example.luanvanbe.config.Security.UserDetailsService
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import javax.servlet.FilterChain
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtTokenFilter (
        private val jwtTokenProvider: JwtTokenProvider,
        private val userDetailsService: UserDetailsService
): UsernamePasswordAuthenticationFilter() {
    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
        val token = extractTokenFromRequest(request)
        if (token != null && jwtTokenProvider.validateToken(token)) {
            val username = jwtTokenProvider.extractUsername(token)
            val userDetails: UserDetails = userDetailsService.loadUserByUsername(username!!)
            val authenticationToken = UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)
            SecurityContextHolder.getContext().authentication = authenticationToken
        }
        return super.attemptAuthentication(request, response)
    }

    override fun successfulAuthentication(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain, authResult: Authentication) {
        super.successfulAuthentication(request, response, chain, authResult)
        val userDetails = authResult.principal as UserDetails2
        val nhanVien = userDetails.getNhanVien()

        val cookie = Cookie("jwt", authResult.principal.toString())
        cookie.secure = true
        cookie.isHttpOnly = true
        cookie.maxAge = 60*1
        cookie.value = "$nhanVien"
        response.addCookie(cookie)
        chain.doFilter(request, response)
    }

    private fun extractTokenFromRequest(request: HttpServletRequest): String? {
        val header = request.getHeader("Authorization")
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7)
        }
        return null
    }
}