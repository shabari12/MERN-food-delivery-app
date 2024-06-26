import axios from "axios";
import React, { createContext, useState, useEffect, useCallback } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const url = "https://food-delivery-backend-d189.onrender.com";

  const [food_list, setFoodList] = useState([]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1;
      } else {
        delete updatedItems[itemId];
      }
      return updatedItems;
    });
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token: token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    if (!cartItems || typeof cartItems !== "object") {
      return 0; // Ensure cartItems is valid
    }
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      return itemInfo ? total + itemInfo.price * quantity : total;
    }, 0);
  };

  const fetFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = useCallback(async () => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token: token } }
    );
    setCartItems(response.data.cartData);
  }, [token]); // Add token to the dependency array if loadCartData depends on it
  

  useEffect(() => {
    async function loadData() {
      await fetFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }

    loadData();
  }, [loadCartData]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
