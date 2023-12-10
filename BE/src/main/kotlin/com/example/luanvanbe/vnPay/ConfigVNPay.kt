package com.example.luanvanbe.vnPay

import org.springframework.stereotype.Component
import java.io.UnsupportedEncodingException
import java.nio.charset.StandardCharsets
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import javax.servlet.http.HttpServletRequest
import kotlin.collections.ArrayList
import kotlin.experimental.and

@Component
class ConfigVNPay (
        val vnp_PayUrl: String = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
        val vnp_ReturnUrl: String = "http://localhost:3000/cam-on",
        val vnp_TmnCode: String = "I784OPMX",
        val secretKey: String = "KSWAEXPTUBJWZPYNJHFTSWNNSWQQGPWT",
        val vnp_ApiUrl: String = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
){
    fun md5(message: String): String? {
        var digest: String? = null
        try {
            val md = MessageDigest.getInstance("MD5")
            val hash = md.digest(message.toByteArray(StandardCharsets.UTF_8))
            val sb = StringBuilder(2 * hash.size)
            for (b in hash) {
                sb.append(String.format("%02x", b and 0xff.toByte()))
            }
            digest = sb.toString()
        } catch (ex: UnsupportedEncodingException) {
            digest = ""
        } catch (ex: NoSuchAlgorithmException) {
            digest = ""
        }
        return digest
    }

    fun Sha256(message: String): String? {
        var digest: String? = null
        try {
            val md = MessageDigest.getInstance("SHA-256")
            val hash = md.digest(message.toByteArray(StandardCharsets.UTF_8))
            val sb = StringBuilder(2 * hash.size)
            for (b in hash) {
                sb.append(String.format("%02x", b and 0xff.toByte()))
            }
            digest = sb.toString()
        } catch (ex: UnsupportedEncodingException) {
            digest = ""
        } catch (ex: NoSuchAlgorithmException) {
            digest = ""
        }
        return digest
    }

    fun hashAllFields(fields: Map<String, String>): String {
        val fieldNames = ArrayList(fields.keys)
        fieldNames.sort()
        val sb = StringBuilder()
        val itr = fieldNames.iterator()
        while (itr.hasNext()) {
            val fieldName = itr.next()
            val fieldValue = fields[fieldName]
            if (fieldValue != null && fieldValue.isNotEmpty()) {
                sb.append(fieldName)
                sb.append("=")
                sb.append(fieldValue)
            }
            if (itr.hasNext()) {
                sb.append("&")
            }
        }
        return hmacSHA512(secretKey, sb.toString())
    }

    fun hmacSHA512(key: String, data: String): String {
        try {
            if (key == null || data == null) {
                throw NullPointerException()
            }
            val hmac512 = Mac.getInstance("HmacSHA512")
            val hmacKeyBytes = key.toByteArray()
            val secretKey = SecretKeySpec(hmacKeyBytes, "HmacSHA512")
            hmac512.init(secretKey)
            val dataBytes = data.toByteArray(StandardCharsets.UTF_8)
            val result = hmac512.doFinal(dataBytes)
            val sb = StringBuilder(2 * result.size)
            for (b in result) {
                sb.append(String.format("%02x", b and 0xff.toByte()))
            }
            return sb.toString()
        } catch (ex: Exception) {
            return ""
        }
    }

    fun getIpAddress(request: HttpServletRequest): String {
        return try {
            var ipAddress = request.getHeader("X-FORWARDED-FOR")
            if (ipAddress == null) {
                ipAddress = request.remoteAddr
            }
            ipAddress
        } catch (e: Exception) {
            "Invalid IP:" + e.message
        }
    }

    fun getRandomNumber(len: Int): String {
        val rnd = Random()
        val chars = "0123456789"
        val sb = StringBuilder(len)
        for (i in 0 until len) {
            sb.append(chars[rnd.nextInt(chars.length)])
        }
        return sb.toString()
    }
}