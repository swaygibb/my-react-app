import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Dashboard from './Dashboard';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../api/auth', () => ({
  logout: vi.fn(),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state when no user is found in localStorage', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(null),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders user email when user is found in localStorage', async () => {
    const mockUser = { email: 'user@example.com' };
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(JSON.stringify(mockUser)),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome, user@example.com/i)).toBeInTheDocument();
  });
});
