import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Foods from "./Components/Foods/Foods";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

   // card item count here
  const cartItemCount = cartItems.length;

  return (
    <>
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Foods
        cartItems={cartItems}
        setCartItems={setCartItems}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}

export default App;
