import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import messageSquareIcon from "../../assets/message-square.svg";
import IconButton from "../../components/IconButton/IconButton";
import feedbackService from "../../services/feedback";
import "./Home.css";
import FeedbackForm from "./views/FeedbackForm";

function Home() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    feedbackService.getList().then(({ data }) =>
      console.log({
        feedbackList: data,
      })
    );
  }, []);

  return (
    <div id="app" data-testid="app">
      <div className="container">
        <IconButton
          data-testid="feedback-button"
          className="feedback-btn"
          onClick={(e) => setOpened(!opened)}
          icon={messageSquareIcon}
          alt="Feedback Button"
        />
      </div>
      <Modal
        closeButtonLabel="Close modal"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Feedback"
        centered
      >
        <FeedbackForm onSubmit={() => setOpened(false)} />
      </Modal>
    </div>
  );
}

export default Home;
