import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post(
                    'http://localhost:3000/api/v1/auth/logout',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                localStorage.removeItem('token');
                navigate('/');
            } catch (error) {
                console.log(error);
                navigate('/');
            }
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