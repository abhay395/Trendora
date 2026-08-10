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
    <div className="min-h-screen bg-white/50 backdrop-blur-3xl flex items-center justify-center px-8 py-20 font-outfit">
        {/* Abstract Background Decoration */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[10%] w-[40rem] h-[40rem] bg-indigo-100/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] bg-amber-50/30 rounded-full blur-[100px]"></div>
        </div>

      <div className="max-w-md w-full glass border-white/40 p-10 rounded-[2.5rem] shadow-glass">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase mb-3">Welcome Back.</h2>
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Log in to your Trendora account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 ml-1">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="YOU@EXAMPLE.COM"
              className="w-full glass border-white/50 px-5 py-4 text-xs font-bold uppercase tracking-widest focus:ring-0 focus:border-black focus:bg-white/60 transition-all rounded-2xl placeholder:text-gray-300"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  message: "Enter a valid email"
                }
              })}
            />
            {errors?.email ? <p className="font-black text-[9px] uppercase tracking-widest text-red-500 mt-2 ml-1">{errors?.email.message}</p> : null}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                Password
                </label>
            </div>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full glass border-white/50 px-5 py-4 text-xs font-bold focus:ring-0 focus:border-black focus:bg-white/60 transition-all rounded-2xl placeholder:text-gray-300"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                  message: "Use 8+ characters with an uppercase letter, lowercase letter, number, and symbol"
                }
              })}
            />
            {errors?.password ? <p className="font-black text-[9px] uppercase tracking-widest text-red-500 mt-2 ml-1">{errors?.password.message}</p> : null}
          </div>

          <div className="flex items-center ml-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" {...register("remeberMe")} className="w-4 h-4 rounded border-gray-200 text-black focus:ring-0 accent-black" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">Remember Me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-[0.98] mt-4"
          >
            Log In
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            New here?{" "}
            <Link to={'/signup'} className="text-black font-black hover:text-indigo-600 transition-colors ml-1 underline decoration-2 underline-offset-4">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
