"use client"

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 const handleEmailSignIn = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Redirect to next page
      window.location.href = "/pages/Dashboard"; // or Next.js router push
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Server error");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <>
      <style>
        {`/* Container */
.signin-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #eff6ff, #ffffff, #f3e8ff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  flex-direction: column;
}

/* Card */
.signin-card {
  background: #fff;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.signin-header h1 {
  font-size: 28px;
  font-weight: bold;
  color: #111827;
}

.signin-header p {
  color: #6b7280;
  margin-top: 4px;
}

.signin-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 16px;
}

.lock-icon {
  color: white;
  width: 32px;
  height: 32px;
}

/* Form */
.form-group {
  text-align: left;
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #374151;
  margin-bottom: 4px;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  outline: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.input-wrapper input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #bfdbfe;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #9ca3af;
  width: 20px;
  height: 20px;
}

.eye-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
}

.eye-btn:hover {
  color: #4b5563;
}

/* Remember me & Forgot password */
.remember-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6b7280;
}

.forgot-btn {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.forgot-btn:hover {
  text-decoration: underline;
}

/* Sign In Button */
.signin-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  border: none;
  color: white;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.signin-btn:hover {
  transform: scale(1.02);
  background: linear-gradient(to right, #2563eb, #7e22ce);
}

.signin-btn:active {
  transform: scale(0.98);
}

.signin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Footer */
.signup-text {
  margin-top: 12px;
  font-size: 14px;
  color: #6b7280;
}

.signup-btn {
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 500;
  cursor: pointer;
}

.signup-btn:hover {
  text-decoration: underline;
}
 
 
`}
      </style>
      <div className="signin-container">
        <div className="signin-card">
          <div className="signin-header">
            <div className="signin-icon">
              <Lock className="lock-icon" />
            </div>
            <h1>BNSD</h1>
          </div>
          <form onSubmit={handleEmailSignIn}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="remember-row">
              <Link href="/pages/forgotPassword" className="forgot-btn">
                Forgot Password?
              </Link>
              <Link href="/pages/ChangePassword" className="forgot-btn">
                Change Password?
              </Link>
               
            </div>

            <button type="submit" disabled={isLoading} className="signin-btn">
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          {/* 
        <p className="signup-text">
          Don’t have an account? <button className="signup-btn">Sign up</button>
        </p> */}
        </div>
      </div>
    </>
  );
}
