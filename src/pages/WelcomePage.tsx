import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { BASE_URL, END_POINT } from "../define/api";
import MainLayout from "../components/layout/MainLayout";
import useTimeout from "../hooks/useTimeout";
import useFetch from "../hooks/useFetch";

interface IWelcomeMsgResponse {
  msg: string;
}

function WelcomePage() {
  const [msg, setMsg] = useState<string>("");
  const [move, setMove] = useState(false);
  const { loading, error } = useFetch<IWelcomeMsgResponse>(
    `${END_POINT.WELCOME_PAGE_MSG}`,
    useCallback((data) => {
      setMsg(data.msg);
    }, [])
  );

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
