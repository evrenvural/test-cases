import IconButton from "./IconButton";
import { fireEvent, render, screen } from "@testing-library/react";

const setup = ({ icon, alt, onClick }) => {
  render(
    <IconButton data-testid="button" onClick={onClick} icon={icon} alt={alt} />
  );
};

it("onClick event should work correctly", () => {
  const mockCallback = jest.fn((x) => 42 + x);
  setup({
    onClick: mockCallback,
  });

  fireEvent.click(screen.getByTestId("button"));

  expect(mockCallback.mock.calls.length).toBe(1);
});

it("alt text should be render correctly", () => {
  const mockAlt = "mockAlt";
  setup({
    alt: mockAlt,
  });

  const altText = screen.getByAltText(mockAlt);

  expect(altText).toBeTruthy();
});
