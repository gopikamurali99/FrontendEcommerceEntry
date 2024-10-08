import axios from "axios";
import React,{createContext,useState,useEffect,useContext} from "react";

const CartContext = createContext();

export const CartProvider = ({children})=>{
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState('');
   
    const apiUrl= import.meta.env.VITE_BASE_URL 

    useEffect(()=>{
        const fetchCart = async() =>{
            const token = localStorage.getItem('customertoken');
            if(!token)
                return;
         try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/customer/cart`,{
             headers:{
                Authorization:`Bearer ${token}`
             }
            }

    );
    console.log('Full API response:', response);

    // Log only the cart data to inspect its structure
    console.log('Cart items:', response.data.items);
    setCart({ items: response.data.items || [] });
} catch (error) {
        console.error('Error fetching cart:', error);
        setCart({ items:  [] });
         }
         finally {
            setLoading(false); // Set loading to false after the data has been fetched
        }
        }
        fetchCart();
    },[])
    const cartCount = cart.items.length;
    const addToCart = async (product,selectedSize,removeFromWishlist) => {

        const token = localStorage.getItem('customertoken');
        console.log(localStorage.getItem('customertoken'));
            if(!token){
                console.error('User not authenticated');
                return;
            }
                
         try {
            const response = await axios.post(`${apiUrl}/customer/cart`,

                { productId: product.id, quantity: 1 , sizes: selectedSize,}, // Data to send
                {
                  headers: {
                    Authorization: `Bearer ${token}` // Send the JWT token in headers
                  }
                }
              );
              setCart({ items: response.data.items || [] });
              setNotification('Item added to cart!');
              if (removeFromWishlist) {
                removeFromWishlist(product.id);
              }
              setTimeout(() => setNotification(''), 3000);
              window.location.reload();
              
             
              
         } catch (error) {
            console.error('Error adding to cart:', error);
         }
    }
   
const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('customertoken');
    if (!token) {
        console.error('User not authenticated');
        return;
    }

    try {
        const response = await axios.delete(`${apiUrl}/customer/cart/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the JWT token in headers
            },
        });

        setCart({ items: response.data.items || [] });
       
        window.location.reload();
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};
const updateCartQuantity = async(itemId,newQuantity) => {
    const token = localStorage.getItem('customertoken')
    if(!token){
        console.error('user not authenticated');
        return;
    }
    try {
        const response = await axios.put(`${apiUrl}/customer/cart/${itemId}`,
            { quantity:newQuantity},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the JWT token in headers
                },
            }

        )
        setCart({ items: response.data.items || [] });
        window.location.reload();
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        
    }
}
const clearCart = async () => {
    const token = localStorage.getItem('customertoken');
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.delete(`${apiUrl}/customer/cart`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the JWT token in headers
        },
      });

      setCart({ items: [] }); // Clear the cart in the frontend state
      setNotification('Cart cleared successfully!');
      setTimeout(() => setNotification(''), 3000); // Optional: Auto-hide notification
    } catch (error) {
      console.error('Error clearing cart:', error);
      setNotification('Error clearing cart');
    }
  };

    return (
        <CartContext.Provider value={{cart,addToCart,loading,removeFromCart,updateCartQuantity,notification,cartCount,setNotification,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart = () => {
    return useContext(CartContext);
  };
