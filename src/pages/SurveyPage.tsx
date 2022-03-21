import React, { useCallback, useState } from "react";
import { END_POINT } from "../define/api";
import MainLayout from "../components/layout/MainLayout";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SurveyOX from "../components/survey/SurveyOX";
import SurveyText from "../components/survey/SurveyText";
import PageMoveBtn from "../components/button/PageMoveBtn";
import "./SurveyPage.css";

const enum SURVEY_TYPE {
  DEFAULT,
  OX,
  TEXT,
}

interface ISurveyResponse {
  surveyMsg: string;
  type: string;
}

function SurveyPage() {
  const [surveyType, setSurveyType] = useState(SURVEY_TYPE.DEFAULT);
  const [question, setQuestion] = useState<string>("Default Msg");
  const [selected, setSelected] = useState("yes");
  const [text, setText] = useState("");
  const [showMovePageButton, setShowMovePageButton] = useState(false);
  const setData = useCallback((data) => {
    setQuestion(data.surveyMsg);
    if (data.type === "ox") {
      setSurveyType(SURVEY_TYPE.OX);
    } else {
      setSurveyType(SURVEY_TYPE.TEXT);
    }
  }, []);
  const { loading, error } = useFetch<ISurveyResponse>(
    `${END_POINT.SURVEY_PAGE_QUESTION}`,
    setData
  );

  const submitSurvey = () => {
    setShowMovePageButton(true);
  };

  const renderSurveyContent = () => {
    if (surveyType === SURVEY_TYPE.OX) {
      return <SurveyOX selected={selected} setSelected={setSelected} />;
    } else if (surveyType === SURVEY_TYPE.TEXT) {
      return <SurveyText text={text} setText={setText} />;
    }
    return <></>;
  };

  if (loading) {
    return (
      <MainLayout>
        <h2>로딩중,,</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="survey-section">
        <h2 className="survey-question">{!error ? question : error}</h2>
        {renderSurveyContent()}
        <button className="survey-submit-btn" onClick={submitSurvey}>
          제출
        </button>
      </section>
      <section className="move-page-btn-section">
        {showMovePageButton ? (
          <PageMoveBtn>
            <Link to="/welcome">환영페이지 이동</Link>
          </PageMoveBtn>
        ) : (
          <></>
        )}
      </section>
    </MainLayout>
  );
}

export default SurveyPage;
