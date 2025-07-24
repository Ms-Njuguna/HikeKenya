import React, { useState } from "react";

function MpesaModal({ trail, onClose }) {

    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    // Function to validate phone number format (returns true if phone is valid ln 12)
    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventdefault();

        if (!isValidPhoneNumber(phone)) {
            setError("Enter a valid phone number (e.g 0722 123 456 or 0116 123 456)");
            return;
        }
    }

    const userId = localStorage.getItem("userId");

    // Fetch the users current data to update to update their payment history
    fetch(`http://localhost:3000/users/${userId}`)
    .then ((res) => res.json())
    .then((user) => {
        const newPayment = {
            trail: trail.id,
            title: trail.title,
            amount: trail.price,
            phone: phone,
            date: new Date().toISOString(),
        };
    })
}