"use client";
import { useState } from "react";
import { auth, setupRecaptcha } from "./firebase/firebase";
import { signInWithPhoneNumber } from "firebase/auth";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // 🔹 SEND OTP USING FIREBASE
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setIsLoading(true);

      setupRecaptcha();

      const formattedPhone = "+91" + phone;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;

      setIsLoading(false);
      setStep(2);
    } catch (error) {
      setIsLoading(false);
      setError("OTP sending failed. Try again.");
      console.log(error);
    }
  };

  // 🔹 VERIFY OTP + RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!oldPassword) {
      setError("Please enter your old password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);

      await window.confirmationResult.confirm(otp);

      // Everything verified
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setError("Invalid OTP. Try again.");
      console.error(error);
    }
  };

  return (
    <>
      <style>{`
        .containerForgot {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #e0e7ff, #c7d2fe);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .card {
          background: white;
          padding: 30px;
          width: 100%;
          max-width: 420px;
          border-radius: 18px;
          box-shadow: 0px 5px 20px rgba(0,0,0,0.1);
        }
        .title {
          margin-top: 5px;
          font-size: 26px;
          font-weight: bold;
          text-align: center;
          color: #1e1e1e;
        }
        .subtitle {
          text-align: center;
          color: #555;
          margin-bottom: 25px;
        }
        .label {
          font-size: 14px;
          color: #333;
          font-weight: 500;
          margin-bottom: 6px;
          display: block;
        }
            input[type="number"]::-webkit-inner-spin-button,
         input[type="number"]::-webkit-outer-spin-button {
         -webkit-appearance: none;
         margin: 0;
        }

         input[type="number"] {
        -moz-appearance: textfield;
         }
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          margin-bottom: 15px;
          font-size: 15px;
        }
        .button {
          width: 100%;
          background: #4f46e5;
          color: white;
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          margin-top: 10px;
        }
        .button:hover {
          background: #4338ca;
        }
        .back {
          text-align: center;
          margin-top: 10px;
          cursor: pointer;
          color: #4f46e5;
          font-weight: 500;
        }
        .error {
          color: red;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .success-box {
          text-align: center;
          padding: 20px;
        }
        .success-title {
          font-size: 24px;
          font-weight: bold;
          color: #16a34a;
        }
      `}</style>

      {/* Success Screen */}
      {success ? (
        <div className="containerForgot">
          <div className="card success-box">
            <div className="success-title">Password Updated!</div>
            <p>Your password has been successfully changed.</p>

            <button
              className="button"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      ) : (
        <div className="containerForgot">
          <div className="card">
            <h2 className="title">Reset Password</h2>
            <p className="subtitle">Enter your details to reset password</p>

            {/* Step 1: Enter Phone Number */}
            {step === 1 && (
              <form onSubmit={handleSendOTP}>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="Enter phone number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // allow only numbers
                    if (value.length <= 10) setPhone(value); // stop at 10 digits
                  }}
                />

                {error && <div className="error">{error}</div>}

                <button className="button" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

            {/* Step 2: OTP + Old + New Password */}
            {/* Step 2: OTP + New + Confirm Password */}
            {step === 2 && (
              <form onSubmit={handleResetPassword}>
                <label className="label">Enter OTP</label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 6) setOtp(value);
                  }}
                />

                <label className="label">New Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && <div className="error">{error}</div>}

                <button className="button" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Reset Password"}
                </button>

                <div className="back" onClick={() => setStep(1)}>
                  ← Back
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
