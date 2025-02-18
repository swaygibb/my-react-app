import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import { vi } from "vitest";
import { test, expect } from "vitest";

vi.mock("../api/auth", () => ({
  register: vi.fn().mockResolvedValue({}),
}));

test("renders Signup", async () => {
  render(
    <MemoryRouter initialEntries={["/signup"]}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
});
