import React, { useContext, useEffect, useState, useCallback } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [url, token]); // Dependencies of useCallback

  useEffect(() => {
    const fetchOrdersAndUpdateData = async () => {
      if (token) {
        await fetchOrders();
      }
    };

    fetchOrdersAndUpdateData();
  }, [token, fetchOrders]); // Include fetchOrders in the dependency array

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-orders">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) => (
                <span key={index}>
                  {item.name}x{item.quantity}
                  {index !== order.items.length - 1 && ","}
                </span>
              ))}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
