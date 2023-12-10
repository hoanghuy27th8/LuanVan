package com.example.luanvanbe.vnPay

import com.example.luanvanbe.repository.DonHangRepository
import com.example.luanvanbe.service.DonHangService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.net.URLEncoder
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

@RestController
@RequestMapping("/api/test")
class VnPayController (
        @Autowired val ConfigVNPay: ConfigVNPay,
        @Autowired val donHangRepository: DonHangRepository
) {

    @GetMapping("/pay/{tong}")
    fun getPay(@PathVariable tong: Long): String {
        val vnp_Version = "2.1.0"
        val vnp_Command = "pay"
        val orderType = "ordertype"
        val amount = tong * 100 // so tien
        val bankCode = "NCB"

//        val vnp_TxnRef = ConfigVNPay.getRandomNumber(8)
        val vnp_TxnRef = ConfigVNPay.getRandomNumber(8)
        val vnp_IpAddr = "127.0.0.1"

        val vnp_TmnCode = ConfigVNPay.vnp_TmnCode

        val vnp_Params = mutableMapOf<String, String>()
        vnp_Params["vnp_Version"] = vnp_Version
        vnp_Params["vnp_Command"] = vnp_Command
        vnp_Params["vnp_TmnCode"] = vnp_TmnCode
        vnp_Params["vnp_Amount"] = amount.toString()
        vnp_Params["vnp_CurrCode"] = "VND"

        vnp_Params["vnp_BankCode"] = bankCode
        vnp_Params["vnp_TxnRef"] = vnp_TxnRef
        vnp_Params["vnp_OrderInfo"] = "Thanh toan don hang: $vnp_TxnRef"
        vnp_Params["vnp_OrderType"] = orderType

        vnp_Params["vnp_Locale"] = "vn"
        vnp_Params["vnp_ReturnUrl"] = ConfigVNPay.vnp_ReturnUrl
        vnp_Params["vnp_IpAddr"] = vnp_IpAddr

        val cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"))
        val formatter = SimpleDateFormat("yyyyMMddHHmmss")
        val vnp_CreateDate = formatter.format(cld.time)
        vnp_Params["vnp_CreateDate"] = vnp_CreateDate

        cld.add(Calendar.MINUTE, 15)
        val vnp_ExpireDate = formatter.format(cld.time)
        vnp_Params["vnp_ExpireDate"] = vnp_ExpireDate

        val fieldNames = ArrayList(vnp_Params.keys)
        fieldNames.sort()
        val hashData = StringBuilder()
        val query = StringBuilder()
        val itr = fieldNames.iterator()
        while (itr.hasNext()) {
            val fieldName = itr.next()
            val fieldValue = vnp_Params[fieldName]
            if (fieldValue != null && fieldValue.isNotEmpty()) {
                //Build hash data
                hashData.append(fieldName)
                hashData.append('=')
                hashData.append(URLEncoder.encode(fieldValue, Charsets.US_ASCII.toString()))
                //Build query
                query.append(URLEncoder.encode(fieldName, Charsets.US_ASCII.toString()))
                query.append('=')
                query.append(URLEncoder.encode(fieldValue, Charsets.US_ASCII.toString()))
                if (itr.hasNext()) {
                    query.append('&')
                    hashData.append('&')
                }
            }
        }
        val queryUrl = query.toString()
        val vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.secretKey, hashData.toString())
        return "${ConfigVNPay.vnp_PayUrl}?$queryUrl&vnp_SecureHash=$vnp_SecureHash"
    }

//    @GetMapping("/ket-qua-thanh-toan")
//    fun getKetQua(
//        @RequestParam("vnp_OrderInfo") response: String,
//        @RequestParam("vnp_ResponseCode") status: String
//        ):String{
//        val idMax = donHangRepository.findMaxOrderId()
//        if (status.equals("00")){
//            var donHang = donHangRepository.findDonHangById(idMax)
//            donHang.dh_tinhTrangThanhToan = true
//            donHangRepository.save(donHang)
//        }
//        print("\n$idMax $response $status\n")
//        return "http://localhost:3000/cam-on?vnp_ResponseCode=00"
//    }
}