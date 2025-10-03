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

    const { loginWithRedirect, isAuthenticated, user } = authContext;

    const handleLogin = () => {
        loginWithRedirect();
    }

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user);
        }
    }, [])


    return (
        <div className='flex flex-col p-2 gap-3 w-60 bg-[url(/blackhole.jpg)] bg-cover bg-[30%]  h-screen justify-between fixed overflow-y-auto overflow-x-hidden sidebar-scroll'>
            <div className="logo pt-3 text-sm">
                <Link to={'/'}><h1 className='font-bold text-2xl text-center pb-5 bg-gradient-to-r from-white/10 via-white/90 to-white/10  bg-clip-text text-transparent'>DeepSynth</h1></Link>
                <div className="utils-one flex flex-col gap-1">
                    <div className="new-chat p-3 pl-4 backdrop-blur-xl hover:scale-104 transition-all rounded-3xl w-full items-center flex flex-row gap-2 hover:bg-white/10 cursor-pointer border border-white/10 text-white/80" onClick={refreshHandle}>
                        <img src={newChatIcon} alt="icon" className='w-6 opacity-60' />
                        <p className='font-bold text-white/60'>New Chat</p>
                    </div>
                    <div className="search p-1 rounded-2xl scale-104 mb-2 transition-colors">
                        <input type="text" className='p-3 border w-full backdrop-blur-xl rounded-3xl pl-4 bg-white/5 placeholder:text-white/60 hover:bg-white/20 hover:scale-105 transition duration-200 text-white/60 focus:outline-none border-white/10' placeholder='Search' />
                    </div>
                    {message?.trim() && <div className="chats pt-3 border-t border-white/20">
                        <p className="chat pl-5 pb-3 text-white/40">Chats</p>
                        <div className="previous-chats pr-2.5 pt-2.5 pl-3.5 pb-2 text-[15px] items-center rounded-2xl shadow-2xl backdrop-blur-sm bg-white/30 border border-white/10">
                            <p className='text-black/80'>{message}</p>
                        </div>
                    </div>}

                </div>
            </div>
            <div className="util flex flex-col gap-1 pt-2">
                <div className="settings flex flex-col gap-1">
                    {!isAuthenticated && <div className="set p-2 pl-5 bg-gradient-to-r from-white/60 via-white/90 to-white/60 hover:bg-white/50 cursor-pointer rounded-2xl flex flex-row justify-between text-center" onClick={() => handleLogin()} >
                        <p>Sign In</p>
                    </div>}
                    {isAuthenticated && <Link to={'/account'}> <div className="set p-2 transition-all hover:bg-white/10 cursor-pointer rounded-2xl flex flex-row gap-3 items-center backdrop-blur-3xl">
                        <img src={user?.picture} alt="" className='w-12 rounded-[50px]' />
                        <div className='flex flex-col items-baseline text-white/80'>
                            <p className='font-semibold'>{user?.name}</p>
                            <p className='text-white/40'>Free Plan</p>
                        </div>
                    </div></Link>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 