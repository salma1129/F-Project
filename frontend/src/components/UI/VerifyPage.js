import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/VerifyPage.css";
import React from 'react';

function VerifyPage() {
  const { userId, uniqueString } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/verify/${userId}/${uniqueString}`)
      .then((res) => {
        setStatus(res.data.message || "Verification successful!");
        setSuccess(true);
      })
      .catch((err) => {
        setStatus(err.response?.data?.message || "Verification failed.");
        setSuccess(false);
      });
  }, [userId, uniqueString]);

  return (
    <div className="verify-container">
      <div className={`verify-box ${success === null ? "" : success ? "success" : "error"}`}>
        <h2>{status}</h2>
        {success && <a href="/login" className="login-link">Go to Login</a>}
      </div>
    </div>
  );
}

export default VerifyPage;
