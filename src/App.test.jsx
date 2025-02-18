import { render, screen } from "@testing-library/react";
import App from "./App";
import { test, expect } from "vitest";

test("renders react app", () => {
  render(<App />);
  expect(screen.getByText(/Welcome to My React App/i)).toBeInTheDocument();
});
