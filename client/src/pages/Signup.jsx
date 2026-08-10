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
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-20 font-outfit">

      <div className="max-w-md w-full border border-gray-200 p-10 bg-white">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase mb-2">Join Trendora.</h1>
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Create your account to start shopping</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="space-y-2">
            <label htmlFor="signup-name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
              Full Name
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="w-full bg-white border border-gray-200 px-4 py-3.5 text-xs font-bold tracking-wide focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 placeholder:font-normal placeholder:tracking-normal"
              {...register("name", { required: "Name is required" })}
            />
            {errors?.name && (
              <p className="font-black text-[9px] uppercase tracking-widest text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-email" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
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
            <label htmlFor="signup-password" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 px-4 py-3.5 text-xs font-bold focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  message: "Use 8+ characters with uppercase, lowercase, number & symbol",
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/
                }
              })}
            />
            {errors?.password && (
              <p className="font-black text-[9px] uppercase tracking-widest text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-confirmPassword" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
              Confirm Password
            </label>
            <input
              id="signup-confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 px-4 py-3.5 text-xs font-bold focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value == password || "Passwords do not match"
              })}
            />
            {errors?.confirmPassword && (
              <p className="font-black text-[9px] uppercase tracking-widest text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors active:scale-[0.98] mt-2"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-black hover:underline decoration-2 underline-offset-4 transition-all ml-1">
              Log In
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Signup;
