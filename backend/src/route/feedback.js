import { Router } from "express";
import DateService from "../helpers/DateService";
import FeedbackRepo from "../model/feedback";
import { STATUS_CODE } from "../utils/constants";

// Initial
const router = Router();

// Functions
async function createFeedback(req, res) {
  const { content } = req.body;

  try {
    const feedback = new FeedbackRepo({
      content,
      updatedTime: DateService.now(),
    });
    await feedback.save();
    res.status(STATUS_CODE.Created).send({
      data: true,
      error: null,
    });
  } catch ({ name, message }) {
    res.status(STATUS_CODE.BadRequest).send({
      data: null,
      error: { name, message },
    });
  }
}

async function getFeedbackList(req, res) {
  try {
    const feedbackList = await FeedbackRepo.find({ isDeleted: false });
    res.status(STATUS_CODE.Ok).send({
      data: feedbackList,
      error: null,
    });
  } catch ({ name, message }) {
    res.status(STATUS_CODE.BadRequest).send({
      data: null,
      error: { name, message },
    });
  }
}

router.post("", createFeedback);
router.get("", getFeedbackList);

export default router;
