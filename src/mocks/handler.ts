import { rest } from "msw";
import { BASE_URL, END_POINT } from "../define/api";
// import dotenv from "dotenv";
// dotenv.config();

const handlers = [
  // 렌딩 페이지 mock api
  rest.get(`${BASE_URL}/${END_POINT.LANDING_PAGE_MSG}`, (_, res, ctx) => {
    return res(ctx.json({ data: { msg: "크로스 앵글 랜딩페이지" } }));
  }),
  // 환영 페이지 mock api
  rest.get(`${BASE_URL}/${END_POINT.WELCOME_PAGE_MSG}`, (_, res, ctx) => {
    return res(ctx.json({ data: { msg: "환영합니다 크로스 앵글입니다." } }));
  }),
  // 설문 페이지 mock api
  rest.get(`${BASE_URL}/${END_POINT.SURVEY_PAGE_QUESTION}`, (_, res, ctx) => {
    const idxBetweenZeroToOne = Math.round(Math.random()); // 0 또는 1
    const samples = [
      { type: "ox", surveyMsg: "크로스앵글을 찾으신 경로가 블로그인가요?" },
      {
        type: "text",
        surveyMsg: "크로스앵글 피드백을 남겨주세요",
      },
    ];
    const data = samples[idxBetweenZeroToOne];

    return res(
      ctx.json({
        data,
      })
    );
  }),
];

export default handlers;
