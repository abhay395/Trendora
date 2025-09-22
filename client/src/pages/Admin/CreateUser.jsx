import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserCreate } from "../../hooks/useAdmin";
import toast from "react-hot-toast";

export default function CreateUser() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    const { mutate, status, error: apiError } = useUserCreate()
    const onSubmit = (data) => {
        console.log("User Data:", data);
        mutate(data)
    };
    useEffect(() => {
        if (status == 'success') reset()
    }, [status])
    useEffect(() => {
        if (apiError) {
            let message = apiError?.response?.data?.message || "Some thing went wrong"
            toast.error(message)
        }
    }, [apiError])
    return (
        <div className=" bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center ">
            <div className="w-full max-w-3xl bg-white/90 shadow-xl rounded-3xl p-10 border border-gray-100">
                <h2 className="text-3xl font-extrabold mb-8 text-gray-800 flex items-center gap-2">
                    <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-lg">
                        +
                    </span>
                    Add User
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Name & Role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Abhay Prajapati"
                                className='w-full border-2 rounded-xl px-4 py-2 transition 
                            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                            border-gray-200'
                                {...register("name", { required: "Name is required" })}
                                disabled={status == 'pending'}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name.message}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                className='w-full border-2 rounded-xl px-4 py-2 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-200'
                                {...register("role", { required: "Role is required" })}
                                defaultValue="user"
                                disabled={status == 'pending'}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && (
                                <span className="text-red-500 text-sm">{errors.role.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className='w-full border-2 rounded-xl px-4 py-2 transition 
                            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                            border-gray-200'
                            {...register("email", { required: "Email is required" })}
                            disabled={status == 'pending'}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="example@12345"
                            className='w-full border-2 rounded-xl px-4 py-2 transition 
                            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                            border-gray-200'
                            {...register("password", { required: "Password is required" })}
                            disabled={status == 'pending'}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Phone (optional) */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Phone <span className="opacity-50 font-normal text-sm ">(optional)</span></label>
                        <input
                            type="text"
                            placeholder="e.g. +91 9876543210"
                            className='w-full border-2 rounded-xl px-4 py-2 transition
                            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                            border-gray-200'
                            {...register("phone")}
                            disabled={status == 'pending'}
                        />
                    </div>

                    {/* Bio (optional) */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Bio <span className="opacity-50 font-normal text-sm ">(optional)</span></label>
                        <textarea
                            placeholder="Write something about user..."
                            className="w-full border-2 rounded-xl px-4 py-2 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-200 focus:outline-none"
                            {...register("bio")}
                            disabled={status == 'pending'}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 rounded-xl font-bold text-lg shadow-lg transition
                       disabled:bg-gray-500 disabled:text-gray-900 disabled:cursor-not-allowed disabled:hover:scale-100
                        bg-gray-900 text-white hover:bg-gray-700"
                        disabled={status == 'pending'}
                    >
                        {status === "pending" ? "⏳ Loading..." : "Create User"}
                    </button>
                </form>
            </div>
        </div>
    );
}
