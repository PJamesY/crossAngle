import { rest } from "msw";
import dotenv from "dotenv";
dotenv.config();

const handlers = [
  rest.get(`${process.env.BASE_URL}/helloMsg.json`, (req, res, ctx) => {
    return res(ctx.json({ data: { msg: "크로스 앵글 랜딩페이지" } }));
  }),
];

export default handlers;
