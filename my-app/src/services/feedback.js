import axios from "axios";
import BACKEND_URL from "../utils/env";
class FeedbackService {
  constructor() {
    this.URL = `${BACKEND_URL}/feedback`;
  }

  getList() {
    return axios.get(this.URL);
  }

  add(feedback) {
    return axios.post(this.URL, feedback);
  }
}

export default new FeedbackService();
