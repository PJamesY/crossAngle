import React, { useState, useEffect } from "react";
import { BASE_URL, END_POINT } from "../define/api";
import MainLayout from "../components/layout/MainLayout";
import { Link } from "react-router-dom";

const enum SURVEY_TYPE {
  DEFAULT,
  OX,
  TEXT,
}

function SurveyPage() {
  const [surveyType, setSurveyType] = useState(SURVEY_TYPE.DEFAULT);
  const [msg, setMsg] = useState<string>("Default Msg");
  const [selected, setSelected] = useState("yes");
  const [showMovePageButton, setShowMovePageButton] = useState(false);

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target.id);
    setSelected(e.target.id);
  };

  const submitSurvey = () => {
    setShowMovePageButton(true);
  };

  const renderSurveyQuestion = () => {
    if (surveyType === SURVEY_TYPE.OX) {
      return (
        <div className="option">
          <label htmlFor="yes">
            <input
              type="radio"
              id="yes"
              name="option"
              checked={selected === "yes"}
              onChange={changeOption}
            />
            O
          </label>
          <label htmlFor="no">
            <input
              type="radio"
              id="no"
              name="option"
              checked={selected === "no"}
              onChange={changeOption}
            />
            X
          </label>
        </div>
      );
    } else if (surveyType === SURVEY_TYPE.TEXT) {
      return <div>text</div>;
    }
    return <></>;
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}/${END_POINT.SURVEY_PAGE_QUESTION}`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setMsg(data.data.surveyMsg);
          if (data.data.type === "ox") {
            setSurveyType(SURVEY_TYPE.OX);
          } else {
            setSurveyType(SURVEY_TYPE.TEXT);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MainLayout>
      {/* {surveyType === } */}
      <h2>{msg}</h2>

      {renderSurveyQuestion()}
      <button onClick={submitSurvey}>제출</button>
      {showMovePageButton ? <Link to="/welcome">환영페이지 이동</Link> : <></>}
    </MainLayout>
  );
}

export default SurveyPage;
