import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BASE_URL, END_POINT } from "../define/api";
import MainLayout from "../components/layout/MainLayout";
import useTimeout from "../hooks/useTimeout";

function WelcomePage() {
  const [msg, setMsg] = useState<string>("");
  const [move, setMove] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}/${END_POINT.WELCOME_PAGE_MSG}`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setMsg(data.data.msg);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useTimeout(() => setMove(true), 2000);

  if (move) {
    return <Navigate to="/" />;
  }
  return (
    <MainLayout>
      <h1 className="landing-page-msg">{msg}</h1>
    </MainLayout>
  );
}

export default WelcomePage;
