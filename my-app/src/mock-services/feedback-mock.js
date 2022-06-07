import { rest } from "msw";
import { setupServer } from "msw/node";
import feedbackService from "../services/feedback";

export const feedbackFailRequest = rest.post(
  feedbackService.URL,
  (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
  }
);

export const feedbackSuccessRequest = rest.post(
  feedbackService.URL,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: true, error: null }));
  }
);

const handlers = [feedbackFailRequest, feedbackSuccessRequest];
export default new setupServer(...handlers);
