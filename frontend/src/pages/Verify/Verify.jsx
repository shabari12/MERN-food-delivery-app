import React, { useEffect, useCallback, useContext } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams(); // Removed setSearchParams
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = useCallback(async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/");
    }
  }, [url, success, orderId, navigate]); // Dependencies for useCallback

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]); // Include verifyPayment in the dependency array

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
