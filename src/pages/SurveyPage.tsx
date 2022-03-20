import React, { useCallback, useState } from "react";
import { END_POINT } from "../define/api";
import MainLayout from "../components/layout/MainLayout";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

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
  const [msg, setMsg] = useState<string>("Default Msg");
  const [selected, setSelected] = useState("yes");
  const [text, setText] = useState("");
  const [showMovePageButton, setShowMovePageButton] = useState(false);
  const setData = useCallback((data) => {
    setMsg(data.surveyMsg);
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

  const changeYesNoOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.id);
  };

  const handleSurveyTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
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
              onChange={changeYesNoOption}
            />
            O
          </label>
          <label htmlFor="no">
            <input
              type="radio"
              id="no"
              name="option"
              checked={selected === "no"}
              onChange={changeYesNoOption}
            />
            X
          </label>
        </div>
      );
    } else if (surveyType === SURVEY_TYPE.TEXT) {
      return (
        <input
          value={text}
          aria-label="survey-input"
          onChange={handleSurveyTextChange}
        />
      );
    }
    return <></>;
  };

  return (
    <MainLayout>
      <h2>{msg}</h2>
      {renderSurveyQuestion()}
      <button onClick={submitSurvey}>제출</button>
      {showMovePageButton ? <Link to="/welcome">환영페이지 이동</Link> : <></>}
    </MainLayout>
  );
}

export default SurveyPage;
