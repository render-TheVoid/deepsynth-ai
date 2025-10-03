import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Topbar from "./Topbar";
import { Link } from "react-router-dom";

const Account = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("No context error!");
    }

    const { user, isAuthenticated, logout, isLoading } = authContext;
    const userSub = user?.sub?.replace(/[^a-zA-Z]/g, "");

    return (
        <>
            <div className='bg-[url(/blackhole.jpg)] h-screen bg-cover overflow-hidden'>
                <Topbar />
                {isAuthenticated &&
                    <div className="flex justify-center items-center h-screen -translate-y-15 flex-col gap-5">
                        <img className="w-35 rounded-[70px] shadow-[0_0px_40px_rgba(0,0,0,0.6)]" src={user?.picture} alt="" />
                        <div className="user-info list-none w-[30%] flex flex-col font-semibold gap-5 border border-white/10 p-4  rounded-3xl text-white/70 backdrop-blur-2xl shadow-[0_0px_60px_rgba(0,0,0,0.4)]">
                            <div className="flex flex-row justify-between p-1">
                                <li>Given Name</li>
                                <li>{user?.given_name}</li>
                            </div>
                            <div className="flex flex-row justify-between p-1">
                                <li>Family Name</li>
                                <li>{user?.family_name}</li>
                            </div>
                            <div className="flex flex-row justify-between p-1">
                                <li>Full Name</li>
                                <li>{user?.name}</li>
                            </div>
                            <div className="flex flex-row justify-between p-1">
                                <li>Signed In Using</li>
                                <li>{userSub}</li>
                            </div>
                        </div>
                        <div className="buttons flex flex-row gap-5">
                            <Link to={'/'}>
                                <div className=" text-white/70 font-bold border hover:scale-105 transition-all backdrop-blur-3xl border-white/20 hover:bg-white/40 px-5 py-3 rounded-2xl">
                                    <p>Continue to Chat</p>
                                </div>
                            </Link>
                            <div onClick={(e) => logout()} className="backdrop-blur-3xl shadow-[0_0px_30px_rgba(0,0,0,0.4)] p-3 px-5 hover:scale-105 transition-all hover:bg-red-900/30 hover:text-red-900 rounded-2xl bg-red-800 font-semibold border-red-800 border-[2px] text-black cursor-pointer">
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                } {isLoading && <h1 className="flex justify-center items-center h-screen font-bold from-white/65 to-white/95 text-4xl bg-clip-text text-transparent">Loading..</h1>}
            </div>
        </>
    );
};

export default Account;