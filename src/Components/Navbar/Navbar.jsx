/* eslint-disable react/prop-types */
import logo from '../../../public/logo.png'
import { FaShoppingBag } from "react-icons/fa";
const Navbar = ({ cartItemCount, onCartClick }) => {
    return (
        <>
            <header className="p-4 bg-orange-100 ">
                <div className="container flex justify-between h-16 mx-auto">
                    <div className='flex justify-center'>
                        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                            <img src={logo} alt="logo image" className='w-20 h-12 ' />
                        </a>
                        <ul className="items-stretch hidden space-x-3 lg:flex uppercase font-semibold">
                            <li className="flex">
                                <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 ">Menu</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1">Rewards</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1">Locations</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 ">gift card</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1">login</a>
                            </li>
                        </ul>
                    </div>
                    <div className="items-center flex-shrink-0 hidden lg:flex gap-3">
                        
                        {/* shopping card here */}
                        <button onClick={onCartClick} className="relative">
                            <FaShoppingBag className="text-5xl" />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full text-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        <button className="self-center px-8 py-3 font-semibold rounded bg-[#e02f2f] uppercase text-white">order now</button>
                    </div>
                    <button className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>
        </>
    );
};

export default Navbar;