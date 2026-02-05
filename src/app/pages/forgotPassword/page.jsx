"use client";

import { useState } from "react";
import "./page.css";
import {
  SendOTP,
  changePassword,
} from "@/app/services/forgotPassword/password";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  const router = useRouter();

useEffect(() => {
  if (otpTimer <= 0) return;

  const interval = setInterval(() => {
    setOtpTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [otpTimer]);

  // SEND OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await SendOTP({ email });
setOtpTimer(120); // 2 minutes
    setIsLoading(false);
    setStep(2);
  };

  // VERIFY OTP + RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New Password & Confirm Password do not match.");
      return;
    }

    try {
      setIsLoading(true);

      await changePassword({
        email,
        otp,
        newPassword,
      });

      setSuccess(true);
    } catch (error) {
      setError(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Recaptcha Container */}
      <div id="recaptcha-container"></div>

      {success ? (
        <div className="containerForgot">
          <div className="card success-box">
            <div className="success-title">Password Updated!</div>
            <p>Your password has been successfully changed.</p>

            <button
              className="button"
              onClick={() => router.push("/pages/login")}
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

            {step === 1 && (
              <form onSubmit={handleSendOTP}>
                <label className="label">Email </label>
                <input
                  type="email"
                  className="input"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setemail(value);
                  }}
                />

                {error && <div className="error">{error}</div>}

                <button className="button" disabled={isLoading || otpTimer>0}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

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
