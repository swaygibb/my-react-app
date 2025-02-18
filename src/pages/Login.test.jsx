import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { test, expect } from "vitest";

test("renders Login component and checks for essential content", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );

  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Back to Home/i)).toBeInTheDocument();
});
