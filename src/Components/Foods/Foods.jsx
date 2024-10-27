/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineTrademark } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiGreaterThan } from "react-icons/pi";

const Foods = ({ isSidebarOpen, setIsSidebarOpen, cartItems, setCartItems }) => {
    const [foodData, setFoodData] = useState([]);

// get data for food items
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`data.json`);
                setFoodData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

// Handle add card food items here
    const handleAddToCart = (food) => {
        const existingItem = cartItems.find((item) => item.id === food.id);

        if (existingItem) {
            const updatedCart = cartItems.map((item) =>
                item.id === food.id ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price } : item
            );
            setCartItems(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        } else {
            const newItem = { ...food, quantity: 1, totalPrice: food.price };
            const updatedCart = [...cartItems, newItem];
            setCartItems(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }

        setIsSidebarOpen(true);
    };

// card item Increase here
    const handleIncreaseQuantity = (id) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    // card item Decrease here
    const handleDecreaseQuantity = (id) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1, totalPrice: (item.quantity - 1) * item.price }
                : item
        );
        setCartItems(updatedCart.filter(item => item.quantity > 0));
        localStorage.setItem("cartItems", JSON.stringify(updatedCart.filter(item => item.quantity > 0)));
    };

    // delete add to card data here.
    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    // handle right side bar close
    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    // card item count here
    const cartItemCount = cartItems.length;

    // total amount calculate here
    const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    return (
        <div className="mt-5">
            <div className="text-center">
                <h1 className="uppercase text-[#e02f2f] text-3xl font-bold flex gap-1 items-center justify-center">
                    chicken crisper <span><AiOutlineTrademark className="-ml-1 mt-1" /></span> combos
                </h1>
                <div className="flex justify-center items-center gap-3 my-5">
                    <p className="flex gap-3 items-center justify-center">
                        <span className="text-[#e02f2f]">menu </span><span><PiGreaterThan className="text-sm mt-1" /></span>
                    </p>
                    <p className="flex gap-1 items-center justify-center">
                        Chicken Crisper <span><AiOutlineTrademark className="-ml-1 mt-1" /></span> Combos
                    </p>
                </div>
                <p className="flex gap-1 items-center justify-center text-xl">
                    Find everything from our Big Mouth Burgers<span><AiOutlineTrademark className="-ml-1 mt-1" /></span>, our always sizzling, Full-on Fajitas and our famous Chicken Crispers <span><AiOutlineTrademark className="-ml-1 mt-1" /></span>
                </p>
            </div>
            <div className="flex justify-end px-10 py-5 items-center">
                <button className="py-2 px-5 border flex justify-end items-center gap-4 mt-1">Menu <IoIosArrowDown /></button>
            </div>

            {/* Food Card Map here */}
            <div className="grid grid-cols-3 gap-3 px-5">
                {foodData.map((food) => {
                    const isAddedToCart = cartItems.some((item) => item.id === food.id);
                    return (
                        <div key={food.id} className="card bg-base-100 w-96 shadow-xl relative">
                            <figure>
                                <img src={food.image} alt={food.name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{food.name}</h2>
                                <div className="badge badge-outline">{food.price}$ /each</div>
                                <p>{food.description}</p>
                                <button
                                    className={`py-2 text-white rounded-md ${isAddedToCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#e02f2f]'}`}
                                    onClick={() => handleAddToCart(food)}
                                    disabled={isAddedToCart}
                                >
                                    {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                                </button>
                                <button className="outline py-2 text-[#e02f2f] rounded-md">Customize</button>
                            </div>
                            <div className="bg-[#e02f2f] rounded-md px-5 py-1 text-white -mt-3 absolute">NEW</div>
                        </div>
                    );
                })}
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed top-0 right-0 w-80 h-full bg-[#e02f2f] shadow-lg p-5 overflow-y-auto z-50 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center">
                            <button className="text-white text-xl mb-5">
                                Cart ({cartItemCount})
                            </button>
                            <button
                                className="text-white text-xl mb-5"
                                onClick={handleSidebarClose}
                            >
                                Close
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
                        {cartItems.length === 0 ? (
                            <p>No items in the cart.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="mb-8 border pb-2 flex justify-center items-center gap-5 relative">
                                    <div>
                                        <img src={item.image} alt="food image" className="w-20 h-20" />
                                    </div>
                                    <div className="absolute -mt-[116px] ml-[266px]">
                                        <AiOutlineDelete onClick={() => handleRemoveFromCart(item.id)}
                                            className=" mt-2 text-2xl cursor-pointer rounded bg-white text-end items-end mx-auto" />
                                    </div>
                                    <div>

                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p>{item.price}$ /each</p>
                                        <p>Total: {item.totalPrice}$</p>
                                        <div className="">
                                            <div className="bg-slate-200 flex items-center w-1/3 ">
                                                <button
                                                    className="px-2 bg-slate-200"
                                                    onClick={() => handleDecreaseQuantity(item.id)}
                                                >
                                                    -
                                                </button>
                                                <span className="bg-slate-200">{item.quantity}</span>
                                                <button
                                                    className=" px-2 bg-slate-200"
                                                    onClick={() => handleIncreaseQuantity(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Sidebar Total Amount */}
                    <div className="border-t pt-4">
                        <h3 className="text-white text-xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Foods;
