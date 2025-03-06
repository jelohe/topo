import { waitFor, fireEvent, render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from "vitest";
import { BrowserRouter } from 'react-router';
import Add from './Add';
import { useNavigate } from 'react-router'

vi.mock('react-router', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
});

describe('Add page', () => {
  afterEach(cleanup);

  it.skip('redirects to the list when scanning a valid QR', async () => {
    if (!navigator.mediaDevices) navigator.mediaDevices = {};
    const mockVideoBlob = new Blob([], { type: 'video/mp4' });
    const mockGetUserMedia = vi.fn(() => {
      return Promise.resolve(mockVideoBlob)
    });
    navigator.mediaDevices.getUserMedia = mockGetUserMedia;

    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    render(<BrowserRouter><Add /></BrowserRouter>);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/');
    });
  });
});
