import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Topbar = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("Topbar context error!");
    }

    const { user, isLoading } = authContext;

    const welcomeLines = [
        `Oh look, ${user?.given_name} alive again.`,
        `${user?.given_name} enters, applause not included.`,
        `Guess who decided to log in — ${user?.giqven_name}.`,
        `User ${user?.given_name} finally authenticated, wow.`,
        `Connection established: ${user?.given_name} actually showed up.`,
        `Surprise login: ${user?.given_name}, the myth.`,
        `Rare login: ${user?.given_name}, the legend.`
    ]

    const randomNum = Math.floor(Math.random() * welcomeLines.length);

    return (
        <div className='backdrop-blur-xl h-fit shadow-2xl'>
            <nav className='flex'>
                <ul className='flex flex-row justify-between items-center w-screen p-6 '>
                    <Link to={'/'} ><li><h1 className='font-bold text-3xl pl-4 bg-gradient-to-r from-white/40 via-white/90 to-white/40  bg-clip-text text-transparent'>DeepSynth AI</h1></li></Link>
                    {!isLoading && <li className='flex items-center justify-center pr-5 font-bold text-xl text-white/70'><h1>{welcomeLines[randomNum]}</h1></li>}
                </ul>
            </nav>
        </div>
    );
};

export default Topbar;