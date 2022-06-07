import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "./Home";

const setup = () => {
  render(
    <MantineProvider>
      <ModalsProvider>
        <Home />
      </ModalsProvider>
    </MantineProvider>
  );

  const feedbackButton = screen.getByTestId("feedback-button");

  return {
    feedbackButton,
  };
};

test("feedback modal should open", async () => {
  const { feedbackButton } = setup();

  fireEvent.click(feedbackButton);
  const FeedbackForm = await waitFor(() =>
    screen.findByTestId("feedback-form")
  );

  expect(FeedbackForm).toBeTruthy();
});

test("modal should close when press esc", async () => {
  const { feedbackButton } = setup();

  fireEvent.click(feedbackButton);
  const feedbackForm = await waitFor(() =>
    screen.findByTestId("feedback-form")
  );
  fireEvent.keyDown(feedbackForm, {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    charCode: 27,
  });
  await waitForElementToBeRemoved(() => screen.queryByTestId("feedback-form"));

  expect(screen.queryByTestId("feedback-form")).toBeFalsy();
});

test("modal should close when click close modal button", async () => {
  const { feedbackButton } = setup();

  fireEvent.click(feedbackButton);
  await waitFor(() => screen.findByTestId("feedback-form"));
  fireEvent.click(screen.getByLabelText("Close modal"));
  await waitForElementToBeRemoved(() => screen.queryByTestId("feedback-form"));

  expect(screen.queryByTestId("feedback-form")).toBeFalsy();
});
