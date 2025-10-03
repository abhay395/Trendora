import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query';
import { useLogout } from '../hooks/useAuth';

function Logout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutateAsync: logoutUser, } = useLogout();

    useEffect(() => {
        const logout = async () => {
            await logoutUser()
            navigate('/')
        };
        logout();
    }, []);
    return (
        <div className='h-screen'>
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>

        </div>
    )
}

export default Logout