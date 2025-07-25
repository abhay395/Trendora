import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  // const [error, setError] = useState(true);
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', data)
      const token = response.data.result.token
      localStorage.setItem('token',token)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[])
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
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to={'/signin'} className="text-black font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
