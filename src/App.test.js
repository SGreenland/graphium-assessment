import { render, screen } from "@testing-library/react";
import SignUpForm from "./SignUpForm";

test("renders learn react link", () => {
  render(<SignUpForm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
