import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostDetail from './PostDetail';
import { vi } from 'vitest';

vi.mock('axios', () => ({
  default: {
    create: vi.fn().mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: { title: 'Post Title', body: 'Post content' } }),
    }),
  },
}));

test('renders PostDetail', async () => {

  render(
    <MemoryRouter initialEntries={['/posts/1']}>
      <Routes>
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText(/Post Title/i)).toBeInTheDocument());
  expect(screen.getByText(/Post content/i)).toBeInTheDocument();
  expect(screen.getByText(/Back to Posts/i)).toBeInTheDocument();
});
