import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useSingup } from "../hooks/useAuth";
import toast from "react-hot-toast";

const BASEURL = import.meta.env.VITE_API_URL;
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const password = watch('password');
  const { mutateAsync: signupUser, error } = useSingup()
  const onSubmit = async (data) => {
    toast.promise(async () => {
      await signupUser(data)
      if (!error) return navigate('/')
    }, {
      loading: "Loading...",
      success: "User signed up successfully",
      error: "Invalid credentials"
    })
  }
  // Handler for Google signup button
  const handleGoogleSignup = () => {
    window.location.href = `${BASEURL}/auth/google-signup`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-12 mt-10">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl  border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-black">Create an Account ✨</h2>
          <p className="text-gray-500 mt-2">Join us by filling the info below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black transition"
              {...register("name", { required: "Name is requierd" })}
            />
            {errors?.fullName ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.fullName.message}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              // id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black transition"
              {...register("email", {
                required: "Email is requierd", pattern: {
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
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black transition"
              {...register("password", {
                required: "Password is requierd", pattern: {
                  message: "Password must be 8+ chars with letters & numbers",
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/
                }
              })}
            />
            {errors?.password ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.password.message}</p> : null}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black transition"
              {...register("confirmPassword", { required: "Confirm Password is requierd", validate: (value) => value == password || "Password do not match" })}
            />
            {errors?.confirmPassword ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.confirmPassword.message}</p> : null}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Google Signup Button */}
        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={handleGoogleSignup}
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
          Already have an account?{" "}
          <Link to={'/login'} className="text-black font-medium hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
