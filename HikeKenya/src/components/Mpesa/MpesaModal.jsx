import React, { useState } from "react";

function MpesaModal({ trail, onClose }) {

    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(phone);
    }
}