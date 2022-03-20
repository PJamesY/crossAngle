import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { END_POINT } from "../define/api";
import "./LandingPage.css";
import useFetch from "../hooks/useFetch";

interface ILandingMsgResponse {
  msg: string;
}

function LandingPage() {
  const [msg, setMsg] = useState<string>("");

  const setData = useCallback((data) => {
    setMsg(data.msg);
  }, []);

  const { loading, error } = useFetch<ILandingMsgResponse>(
    `${END_POINT.LANDING_PAGE_MSG}`,
    setData
  );

  if (loading) {
    return (
      <MainLayout>
        <h2>로딩중,,</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="landing-page-msg">{error ? error : msg}</h1>
      <Link to="/survey" className="link">
        설문지 이동
      </Link>
    </MainLayout>
  );
}

export default LandingPage;
