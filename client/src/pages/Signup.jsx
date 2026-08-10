import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useSingup } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const password = watch('password');
  const { mutateAsync: signupUser } = useSingup();
  const onSubmit = async (data) => {
    try {
      await signupUser(data);
      toast.success("User signed up successfully");
      navigate('/');
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        // Map server-side validation errors to form fields
        err.errors.forEach((errorObj) => {
          const field = Object.keys(errorObj)[0];
          const message = Object.values(errorObj)[0];
          setError(field, { type: "server", message });
        });
        toast.error("Please fix the validation errors");
      } else {
        toast.error(err.message || "Something went wrong during signup");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-3xl flex items-center justify-center px-8 py-20 font-outfit">
        {/* Abstract Background Decoration */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-amber-50/40 rounded-full blur-[100px]"></div>
        </div>

      <div className="max-w-md w-full glass border-white/40 p-10 rounded-[2.5rem] shadow-glass">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase mb-3">Join Trendora.</h2>
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Create your account to start shopping</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 ml-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="JOHN DOE"
              className="w-full glass border-white/50 px-5 py-4 text-xs font-bold uppercase tracking-widest focus:ring-0 focus:border-black focus:bg-white/60 transition-all rounded-2xl placeholder:text-gray-300"
              {...register("name", { required: "Name is required" })}
            />
            {errors?.name ? <p className="font-black text-[9px] uppercase tracking-widest text-red-500 mt-2 ml-1">{errors?.name.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="YOU@EXAMPLE.COM"
              className="w-full glass border-white/50 px-5 py-4 text-xs font-bold uppercase tracking-widest focus:ring-0 focus:border-black focus:bg-white/60 transition-all rounded-2xl placeholder:text-gray-300"
              {...register("email", {
                required: "Email is required", pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  message: "Enter a valid email"
                }
              })}
            />
            {errors?.email ? <p className="font-black text-[9px] uppercase tracking-widest text-red-500 mt-2 ml-1">{errors?.email.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 ml-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full glass border-white/50 px-5 py-4 text-xs font-bold focus:ring-0 focus:border-black focus:bg-white/60 transition-all rounded-2xl placeholder:text-gray-300"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  message: "Use 8+ characters with an uppercase letter, lowercase letter, number, and symbol",
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/
                }
              })}
            />
            {errors?.password ? <p className="font-black text-[9px] uppercase tracking-widest text-red-500 mt-2 ml-1">{errors?.password.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 ml-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full glass border-white/50 px-5 py-4 text-xs font-bold focus:ring-0 focus:border-black focus:bg-white/60 transition-all rounded-2xl placeholder:text-gray-300"
              {...register("confirmPassword", { required: "Please confirm your password", validate: (value) => value == password || "Passwords do not match" })}
            />
            {errors?.confirmPassword ? <p className="font-black text-[9px] uppercase tracking-widest text-red-500 mt-2 ml-1">{errors?.confirmPassword.message}</p> : null}
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-[0.98] mt-4"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Already have an account?{" "}
            <Link to={'/login'} className="text-black font-black hover:text-indigo-600 transition-colors ml-1 underline decoration-2 underline-offset-4">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
