import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = (props) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`search?${searchQuery}`);
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [window.location.search])

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="headerContainer px-6">
                <div className="flex justify-between items-center py-3">
                    <div className="brandSearch flex items-center">
                        <Link to='/'>
                        <h1 className="font-bold text-xl flex flex-wrap">
                            <span className="text-slate-500">Sahand</span>
                            <span className="text-slate-700">Estate</span>
                        </h1>
                        </Link>
                        <div className='ml-4'>
                            <form onSubmit={handleSubmit} className="bg-slate-100 flex items-center rounded-full">
                                <input 
                                    type="text" 
                                    placeholder="search..." 
                                    className="bg-transparent p-2 sm:p-3 focus:outline-none w-24 sm:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type='submit' className='p-3'>
                                    <FaSearch className='text-slate-600'/>
                                </button>
                            </form>
                        </div>
                    </div>
                    <ul className='flex gap-4'>
                        <Link to='/about'><li className='text-slate-700 hover:underline cursor-pointer hidden sm:inline'>About</li></Link>
                        {currentUser ?(
                            <Link to='/profile'>
                                <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover cursor-pointer'/>
                            </Link>
                        ) : (
                            <button onClick={props.openSignInModal} className='bg-green-600 px-3 py-2 rounded-full text-white hover:bg-green-700 text-center'>Get started</button>
                        )}
                        {/* <button onClick={props.openSignUpModal} className='cursor-pointer'>Sing up</button> */}
                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Header;