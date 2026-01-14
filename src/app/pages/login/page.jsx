"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import "./page.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/app/redux/slices/loginSlice";  

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch(); // ✅ redux dispatcher
  console.log("Selector", useSelector((state)=>state.auth.userId))

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = { email, password };

      // 🔹 LOGIN API
      const res = await axios.post(
        "http://localhost:8000/login",
        payload
      );

      // ✅ Store email in redux (persisted)
      dispatch(
        loginSuccess({
          userId: res.data.userId, // fallback safe
        })
      );

      toast.success("Login Successfully");

      // 🔹 Redirect after login
      router.push("/pages/dashboard");

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                placeholder="you@gmail.com"
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
          </div>

          <button type="submit" disabled={isLoading} className="signin-btn">
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
