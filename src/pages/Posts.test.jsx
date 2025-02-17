import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Posts from './Posts';
import { vi } from 'vitest';

test('displays message when no posts are found', async () => {
  vi.mock('axios', () => ({
    default: {
      create: vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: [] }),
      }),
    },
  }));

  render(
    <MemoryRouter initialEntries={['/posts']}>
      <Routes>
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/No posts found/i)).toBeInTheDocument();
});
