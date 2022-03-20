import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { BASE_URL, END_POINT } from "../define/api";
import "./LandingPage.css";

function LandingPage() {
  const [data, setData] = useState<string>("Default Msg");

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}/${END_POINT.LANDING_PAGE_MSG}`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setData(data.data.msg);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <h1 className="landing-page-msg">{data}</h1>
      <Link to="/survey" className="link">
        설문지 이동
      </Link>
    </MainLayout>
  );
}

export default LandingPage;
