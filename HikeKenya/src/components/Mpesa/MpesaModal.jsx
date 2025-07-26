
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import mpesaIcon from '../../ImageIcons/download.png';
import ConfettiExplosion from "react-confetti-explosion";

function MpesaModal({ trail, onClose }) {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phone)) {
      setError("Enter a valid phone number (e.g 0722 123 456)");
      return;
    }

    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((userData) => {
        const newPayment = {
          trail: trail.id,
          title: trail.title,
          amount: trail.price,
          phone: phone,
          date: new Date().toISOString(),
        };

        const updatedPayments = [...(userData.payments || []), newPayment];

        return fetch(`http://localhost:3000/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payments: updatedPayments }),
        });
      })
      .then((res) => res.json())
      .then(() => {
        setSuccess(true);
        setError("");

        setTimeout(() => {
          onClose();
        }, 7000);
      })
      .catch((err) => {
        console.error("Payment failed", err);
        setError("Something went wrong. Try again.");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button type="button" onClick={onClose} className="absolute top-2 right-4 text-gray-600 text-xl">&times;</button>
        <h2 className="text-xl font-bold mb-2">Pay with M-pesa or Airtel Money</h2>
        <p className="mb-4 text-gray-700">
          Trail: <strong>{trail.title}</strong><br />
          Amount: <strong>KES {trail.price}</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0722 123 456"
              className="w-full border p-2 rounded"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success &&
           <>
              <p className="text-green-600 text-sm mt-2">Payment was successful ✅</p>
              <div className="absolute inset-0 flex justify-center items-center z-50">
                <ConfettiExplosion force={0.8} duration={3000} particleCount={150} width={1600} zIndex={9999}/>
              </div>
            </>
          }
          <button
            type="submit"
            className="bg-green-700 text-[#FAF7F2] px-4 py-2 rounded flex items-center justify-center gap-2"
          >
            <span className="flex items-center gap-2">
              <img src={mpesaIcon} alt="M-Pesa" className="h-5 w-5" />
              Confirm Payment
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default MpesaModal;
