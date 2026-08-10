import React, { useEffect } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import toast from "react-hot-toast";

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
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-20 font-outfit">

      <div className="max-w-md w-full border border-gray-200 p-10 bg-white">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase mb-2">Welcome Back.</h1>
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Log in to your Trendora account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="space-y-2">
            <label htmlFor="login-email" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="text"
              placeholder="you@example.com"
              className="w-full bg-white border border-gray-200 px-4 py-3.5 text-xs font-bold tracking-wide focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 placeholder:font-normal placeholder:tracking-normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  message: "Enter a valid email"
                }
              })}
            />
            {errors?.email && (
              <p className="font-black text-[9px] uppercase tracking-widest text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="login-password" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 px-4 py-3.5 text-xs font-bold focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                  message: "Use 8+ characters with uppercase, lowercase, number & symbol"
                }
              })}
            />
            {errors?.password && (
              <p className="font-black text-[9px] uppercase tracking-widest text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                {...register("remeberMe")}
                className="w-3.5 h-3.5 border-gray-300 accent-black focus:ring-0"
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                Remember Me
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors active:scale-[0.98] mt-2"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            New here?{" "}
            <Link to="/signup" className="text-black font-black hover:underline decoration-2 underline-offset-4 transition-all ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
