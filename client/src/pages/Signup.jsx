import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import useAuthStore from "../store/authStore";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const password = watch('password');
  const { signupUser, error } = useAuthStore()
  const onSubmit = async (data) => {
    let res = await signupUser(data)
    if (res) {
      navigate('/')
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])
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
