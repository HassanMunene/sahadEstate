import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl max-auto p-3">
                <Link to='/'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500">Sahand</span>
                    <span className="text-slate-700">Estate</span>
                </h1>
                </Link>
                <form className="bg-slate-100 flex items-center rounded-lg">
                    <input type="text" placeholder="search..." className="bg-transparent p-3 focus:outline-none w-24 sm:w-64"/>
                    <button className='p-3'>
                        <FaSearch className='text-slate-600'/>
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'><li className='text-slate-700 hover:underline cursor-pointer hidden sm:inline'>Home</li></Link>
                    <Link to='/about'><li className='text-slate-700 hover:underline cursor-pointer hidden sm:inline'>About</li></Link>
                    <button onClick={props.openSignInModal} className='cursor-pointer'>Sign in</button>
                    <button onClick={props.openSignUpModal} className='cursor-pointer'>Sing up</button>
                </ul>
            </div>
        </header>
    )
}
export default Header;