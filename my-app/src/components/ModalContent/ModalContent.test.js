import { fireEvent, render, screen } from "@testing-library/react";
import ModalContent from "./ModalContent";

const setup = ({ error, content, onConfirm }) => {
  render(
    <ModalContent error={error} content={content} onConfirm={onConfirm} />
  );

  const confirmButton = screen.getByTestId("confirm-button");

  return {
    confirmButton,
  };
};

it("onConfirm event should work correctly", () => {
  const mockCallback = jest.fn((x) => 42 + x);
  const { confirmButton } = setup({
    onConfirm: mockCallback,
  });

  fireEvent.click(confirmButton);

  expect(mockCallback.mock.calls.length).toBe(1);
});

it("content text should seen correctly", () => {
  const mockContentText = "WE HAVE GOT YOUR FEEDBACK";
  setup({
    content: mockContentText,
  });

  const content = screen.getByText(/we have got your feedback/i);

  expect(content).toBeTruthy();
});

it("success modal label should have green color", () => {
  const mockContentText = "WE HAVE GOT YOUR FEEDBACK";
  setup({
    content: mockContentText,
    error: false,
  });

  const content = screen.getByText(/we have got your feedback/i);

  expect(content).toHaveStyle({
    color: "#37b24d",
  });
});

it("fail modal label should have red color", () => {
  const mockContentText = "WE HAVE GOT YOUR FEEDBACK";
  setup({
    content: mockContentText,
    error: true,
  });

  const content = screen.getByText(/we have got your feedback/i);

  expect(content).toHaveStyle({
    color: "#f03e3e",
  });
});
