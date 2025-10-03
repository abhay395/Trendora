import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import toast from "react-hot-toast";

const BASEURL = import.meta.env.VITE_API_URL;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const { mutateAsync: loginUser, error, status } = useLogin()
  const onSubmit = async (data) => {
    toast.promise(
      loginUser(data),
      {
        loading: "Loading...",
        success: "User logged in successfully",
        error: "Invalid credentials"
      }
    )
  }
  useEffect(() => {
    if (status == 'success') navigate('/')
  }, [status])
  const handleGoogleLogin = () => {
    window.location.href = `${BASEURL}/auth/google-login`;
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12" >
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl  border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">Welcome Back 👋 Hero</h2>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-md font-semibold text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="text"
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black transition"
              {...register("email", {
                required: "Email is requierd",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  message: "Invalid Email format"
                }
              })}
            />
            {errors?.email ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.email.message}</p> : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black transition"
              {...register("password", {
                required: { message: "Password is required" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                  message: "8+ chars, include letters & numbers"
                }
              })}
            />
            {errors?.password ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.password.message}</p> : null}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-600">
              <input type="checkbox" {...register("remeberMe")} className="form-checkbox rounded text-black" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-gray-600 hover:text-black font-medium transition">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black cursor-pointer text-white font-semibold rounded-xl hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition shadow-sm"
          >
            <svg width="22" height="22" viewBox="0 0 48 48" className="mr-2" aria-hidden="true">
              <g>
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.23l6.9-6.9C36.6 2.36 30.7 0 24 0 14.82 0 6.68 5.8 2.7 14.1l8.1 6.3C12.7 13.7 17.9 9.5 24 9.5z" />
                <path fill="#34A853" d="M46.1 24.6c0-1.6-.14-3.1-.4-4.6H24v9.1h12.4c-.5 2.7-2.1 5-4.4 6.6l7 5.4c4.1-3.8 6.5-9.4 6.5-16.5z" />
                <path fill="#FBBC05" d="M10.8 28.2c-1-2.7-1-5.7 0-8.4l-8.1-6.3C.6 17.6 0 20.7 0 24c0 3.3.6 6.4 1.7 9.5l8.1-6.3z" />
                <path fill="#EA4335" d="M24 48c6.5 0 12-2.1 16-5.7l-7-5.4c-2 1.4-4.7 2.3-9 2.3-6.1 0-11.3-4.1-13.2-9.7l-8.1 6.3C6.7 42.2 14.8 48 24 48z" />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
            Sign up with Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to={'/signup'} className="text-black font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
