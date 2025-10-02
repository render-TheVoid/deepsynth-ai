import newChatIcon from '../assets/addIcon.svg';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
// import settingsIcon from '../assets/settings.svg';
// import { useState,  } from 'react';

interface SidebarProps {
    message: string;
}

const Sidebar = ({ message }: SidebarProps) => {

    const refreshHandle = (): void => {
        window.location.reload();
    };

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("Sidebar!");
    }

    const { loginWithRedirect, isAuthenticated, user, isLoading, logout } = authContext;

    const handleLogin = () => {
        loginWithRedirect();
    }

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user);
        }
    }, [])


    return (
        <div className='flex flex-col p-2 gap-3 w-60 bg-[#141414] h-screen justify-between fixed overflow-y-auto overflow-x-hidden sidebar-scroll'>
            <div className="logo pt-3 text-sm">
                <Link to={'/'}><h1 className='font-bold text-2xl text-center pb-5 bg-gradient-to-r from-white/10 via-white/90 to-white/10  bg-clip-text text-transparent'>DeepSynth</h1></Link>
                <div className="utils-one flex flex-col gap-1">
                    <div className="new-chat p-2 pl-4 rounded-2xl items-center flex flex-row gap-3 hover:bg-white/10 cursor-pointer transition-colors text-white/80" onClick={refreshHandle}>
                        <img src={newChatIcon} alt="icon" className='w-6 opacity-60' />
                        <p className='font-bold text-white/60'>New Chat</p>
                    </div>
                    <div className="search p-1 rounded-2xl mb-2 transition-colors">
                        <input type="text" className='p-2 border w-full rounded-3xl pl-3 bg-white/5 placeholder:text-white/60 hover:bg-white/20 hover:scale-104 transition duration-200 text-white/60 focus:outline-none border-white/20' placeholder='Search' />
                    </div>
                    {message?.trim() && <div className="chats pt-3 border-t border-white/20">
                        <p className="chat pl-5 pb-3 text-white/40">Chats</p>
                        <div className="previous-chats p-2 pl-3 rounded-2xl bg-gradient-to-r from-white/60 via-white/90 to-white/60 hover:bg-white/50 cursor-pointer transition-colors border border-white/20">
                            <p className='text-[#1a1b1c]'>{message}</p>
                        </div>
                    </div>}

                </div>
            </div>
            <div className="util flex flex-col gap-1 pt-2">
                <div className="settings flex flex-col gap-1">
                    <div className='user-settings p-3 rounded-3xl cursor-pointer transition-colors'>
                        {/* <img src={userIcon} alt='user-icon' className='w-6' /> */}
                        <p className='text-[#ffffff60] text-center'>Made by Rishabh</p>
                    </div>
                    {!isAuthenticated && <div className="set p-2 pl-5 bg-gradient-to-r from-white/60 via-white/90 to-white/60 hover:bg-white/50 cursor-pointer rounded-2xl flex flex-row justify-between text-center" onClick={() => handleLogin()} >
                        <p>Sign In</p>
                    </div>}
                    {isAuthenticated && <div className="set p-2 pl-5 bg-gradient-to-r from-white/60 via-white/90 to-white/60 hover:bg-white/50 cursor-pointer rounded-2xl flex flex-row gap-5 text-center">
                        <img src={user?.picture} alt="" className='w-6 rounded-[50px]' />
                        <p>{user?.name}</p>
                    </div>}
                    {isAuthenticated && <div className="set py-2 hover:bg-red-500/20 cursor-pointer rounded-2xl flex flex-row justify-center text-center" onClick={() => logout()} >
                        <p className='text-red-800'>Sign Out</p>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 