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
  const { mutateAsync: loginUser } = useLogin();
  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      toast.success("User logged in successfully");
      navigate('/');
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
    }
  };
  useEffect(() => {
    if (status == 'success') navigate('/')
  }, [status])
  const handleGoogleLogin = () => {
    window.location.href = `${BASEURL}/auth/google-login`;
  };
  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-3xl flex items-center justify-center px-8 py-20 font-outfit">
        {/* Abstract Background Decoration */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[10%] w-[40rem] h-[40rem] bg-indigo-100/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] bg-amber-50/30 rounded-full blur-[100px]"></div>
        </div>

      <div className="max-w-md w-full glass border-white/40 p-10 rounded-[2.5rem] shadow-glass">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase mb-3">Welcome Back.</h2>
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Continue your Trendora journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 ml-1">
              Digital Identity
            </label>
            <input
              name="email"
              type="text"
              placeholder="YOU@EXAMPLE.COM"
              className="w-full glass border-white/50 px-5 py-4 text-xs font-bold uppercase tracking-widest focus:ring-0 focus:border-black focus:bg-white/60 transition-all rounded-2xl placeholder:text-gray-300"
              {...register("email", {
                required: "Digital identity is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  message: "Invalid format"
                }
              })}
            />
            {errors?.email ? <p className="font-black text-[9px] uppercase tracking-widest text-red-500 mt-2 ml-1">{errors?.email.message}</p> : null}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                Secure Key
                </label>
                <a href="#" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                    Reset Key?
                </a>
            </div>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full glass border-white/50 px-5 py-4 text-xs font-bold focus:ring-0 focus:border-black focus:bg-white/60 transition-all rounded-2xl placeholder:text-gray-300"
              {...register("password", {
                required: { message: "Secure key is required" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                  message: "Check complexity"
                }
              })}
            />
            {errors?.password ? <p className="font-black text-[9px] uppercase tracking-widest text-red-500 mt-2 ml-1">{errors?.password.message}</p> : null}
          </div>

          <div className="flex items-center ml-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" {...register("remeberMe")} className="w-4 h-4 rounded border-gray-200 text-black focus:ring-0 accent-black" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">Remember Session</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-[0.98] mt-4"
          >
            Authorize
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 glass border-white/60 text-[10px] font-black uppercase tracking-widest text-gray-700 rounded-2xl hover:bg-white/60 transition-all shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.23l6.9-6.9C36.6 2.36 30.7 0 24 0 14.82 0 6.68 5.8 2.7 14.1l8.1 6.3C12.7 13.7 17.9 9.5 24 9.5z" />
              <path fill="#34A853" d="M46.1 24.6c0-1.6-.14-3.1-.4-4.6H24v9.1h12.4c-.5 2.7-2.1 5-4.4 6.6l7 5.4c4.1-3.8 6.5-9.4 6.5-16.5z" />
              <path fill="#FBBC05" d="M10.8 28.2c-1-2.7-1-5.7 0-8.4l-8.1-6.3C.6 17.6 0 20.7 0 24c0 3.3.6 6.4 1.7 9.5l8.1-6.3z" />
              <path fill="#EA4335" d="M24 48c6.5 0 12-2.1 16-5.7l-7-5.4c-2 1.4-4.7 2.3-9 2.3-6.1 0-11.3-4.1-13.2-9.7l-8.1 6.3C6.7 42.2 14.8 48 24 48z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            New here?{" "}
            <Link to={'/signup'} className="text-black font-black hover:text-indigo-600 transition-colors ml-1 underline decoration-2 underline-offset-4">
              Create Identity
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
