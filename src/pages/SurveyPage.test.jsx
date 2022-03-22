import { render, screen, fireEvent } from "@testing-library/react";
import SurveyPage from "./SurveyPage";
import { BrowserRouter } from "react-router-dom";
import server from "../mocks/server";
import { rest } from "msw";
import { BASE_URL, END_POINT } from "../define/api";

const mockResponse = (data) => (_, res, ctx) => {
  return res(
    ctx.json({
      data,
    })
  );
};

const mockAPI = (data) => {
  return server.use(
    rest.get(
      `${BASE_URL}/${END_POINT.SURVEY_PAGE_QUESTION}`,
      mockResponse(data)
    )
  );
};

const surveyOXResponse = {
  type: "ox",
  surveyMsg: "크로스앵글을 찾으신 경로가 블로그인가요?",
};

const surveyTextResponse = {
  type: "text",
  surveyMsg: "크로스앵글 피드백을 남겨주세요",
};

describe("<SurveyPage/>", () => {
  describe("OX 설문일때", () => {
    it("설문 질문이 렌더링 되어야 한다", async () => {
      mockAPI(surveyOXResponse);
      render(
        <BrowserRouter>
          <SurveyPage />
        </BrowserRouter>
      );
      const landingPageMsg = await screen.findByText(
        "크로스앵글을 찾으신 경로가 블로그인가요?"
      );
      expect(landingPageMsg).toBeInTheDocument();
    });
    it("두개의 radio button 이 렌더링 되어야 한다", async () => {
      mockAPI(surveyOXResponse);
      render(
        <BrowserRouter>
          <SurveyPage />
        </BrowserRouter>
      );
      const YesNode = await screen.findByText("O");
      const NoNode = await screen.findByText("X");
      expect(YesNode).toBeInTheDocument();
      expect(NoNode).toBeInTheDocument();
    });
  });

  describe("Text 질문 일때", () => {
    it("설문지 답변 입력 할수 있는 input tag 생성", async () => {
      mockAPI(surveyTextResponse);
      render(
        <BrowserRouter>
          <SurveyPage />
        </BrowserRouter>
      );
      const input = await screen.findByLabelText("survey-input");
      fireEvent.change(input, { target: { value: "크로스앵글 화이팅하세요" } });
      expect(input.value).toBe("크로스앵글 화이팅하세요");
    });
  });

  it("submit 버튼 눌렀을때 다음 페이지 넘어가는 버튼 생성되어야 한다", async () => {
    render(
      <BrowserRouter>
        <SurveyPage />
      </BrowserRouter>
    );
    const submitButton = await screen.findByText("제출");
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    const moveToWelcomPageButton = screen.getByText("환영페이지 이동");
    expect(moveToWelcomPageButton).toBeInTheDocument();
  });
});
