import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import feedbackServer, {
  feedbackFailRequest,
  feedbackSuccessRequest,
} from "../../../mock-services/feedback-mock";
import FeedbackForm from "./FeedbackForm";

beforeAll(() => feedbackServer.listen());
afterEach(() => feedbackServer.resetHandlers());
afterAll(() => feedbackServer.close());

const setup = () => {
  render(
    <MantineProvider>
      <ModalsProvider>
        <FeedbackForm />
      </ModalsProvider>
    </MantineProvider>
  );

  const contentInput = screen.getByTestId("content-input");
  const clearButton = screen.getByTestId("clear-button");
  const sendButton = screen.getByTestId("send-button");

  return {
    contentInput,
    clearButton,
    sendButton,
  };
};

test("content input should be writable", async () => {
  const { contentInput } = setup();

  fireEvent.change(contentInput, { target: { value: "Trying Something!" } });

  expect(contentInput.value).toBe("Trying Something!");
});

test("text should clear when click clear button", async () => {
  const { contentInput, clearButton } = setup();

  fireEvent.change(contentInput, { target: { value: "Trying Something!" } });
  fireEvent.click(clearButton);

  expect(contentInput.value).toBe("");
});

test("input should not submit with empty content", async () => {
  const { contentInput, sendButton } = setup();

  fireEvent.click(sendButton);

  expect(contentInput).toBeInTheDocument();
});

test("success modal should render when form submit", async () => {
  feedbackServer.use(feedbackSuccessRequest);
  const { contentInput, sendButton } = setup();

  fireEvent.change(contentInput, { target: { value: "Trying Something!" } });
  fireEvent.click(sendButton);
  const successModal = await waitFor(() =>
    screen.findByTestId("success-modal")
  );

  expect(successModal).toBeTruthy();
});

test("success modal should close when click confirm", async () => {
  feedbackServer.use(feedbackSuccessRequest);
  const { contentInput, sendButton } = setup();

  fireEvent.change(contentInput, { target: { value: "Trying Something!" } });
  fireEvent.click(sendButton);
  await waitFor(() => screen.findByTestId("success-modal"));
  fireEvent.click(screen.getByTestId("confirm-button"));
  const successModal = await waitForElementToBeRemoved(() =>
    screen.queryByTestId("success-modal")
  );

  expect(successModal).toBeFalsy();
});

test("success modal should close when click close button", async () => {
  feedbackServer.use(feedbackSuccessRequest);
  const { contentInput, sendButton } = setup();

  fireEvent.change(contentInput, { target: { value: "Trying Something!" } });
  fireEvent.click(sendButton);
  await waitFor(() => screen.findByTestId("success-modal"));
  fireEvent.click(screen.getByLabelText("Close modal"));
  const successModal = await waitForElementToBeRemoved(() =>
    screen.queryByTestId("success-modal")
  );

  expect(successModal).toBeFalsy();
});

test("fail modal should render when form fail", async () => {
  feedbackServer.use(feedbackFailRequest);
  const { contentInput, sendButton } = setup();

  fireEvent.change(contentInput, { target: { value: "Trying Something!" } });
  fireEvent.click(sendButton);
  const failModal = await waitFor(() => screen.findByTestId("fail-modal"));

  expect(failModal).toBeInTheDocument();
});

test("fail modal should close when click confirm", async () => {
  feedbackServer.use(feedbackFailRequest);
  const { contentInput, sendButton } = setup();

  fireEvent.change(contentInput, { target: { value: "Trying Something!" } });
  fireEvent.click(sendButton);
  await waitFor(() => screen.findByTestId("fail-modal"));
  fireEvent.click(screen.getByTestId("confirm-button"));
  const successModal = await waitForElementToBeRemoved(() =>
    screen.queryByTestId("fail-modal")
  );

  expect(successModal).toBeFalsy();
});

test("fail modal should close when click close button", async () => {
  feedbackServer.use(feedbackFailRequest);
  const { contentInput, sendButton } = setup();

  fireEvent.change(contentInput, { target: { value: "Trying Something!" } });
  fireEvent.click(sendButton);
  await waitFor(() => screen.findByTestId("fail-modal"));
  fireEvent.click(screen.getByLabelText("Close modal"));
  const successModal = await waitForElementToBeRemoved(() =>
    screen.queryByTestId("fail-modal")
  );

  expect(successModal).toBeFalsy();
});
