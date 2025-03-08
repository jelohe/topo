import { render, cleanup, waitFor, screen } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from "vitest";
import Scanner from './Scanner';

describe('qr scanner', () => {
  afterEach(cleanup);

  it('shows a loading image', async () => {
    render(<Scanner />);

    await waitFor(() => {
      const el = screen.queryByTestId('loading');
      expect(el).toBeDefined();
    })
  });

  it('when all goes well shows the video feed', async () => {
    navigator.mediaDevices = {};
    const getVideoTracks = vi.fn();
    const streamMock = new MediaStream({ getVideoTracks })
    streamMock.getTracks = vi.fn(() => []);
    navigator.mediaDevices.getUserMedia = vi.fn().mockResolvedValue(streamMock);

    const { container } = render(<Scanner />);

    await waitFor(() => {
      const el = container.querySelector('video');
      el.onplaying();
      expect(el).toBeDefined();
    })
  });

  it('when something goes bad shows an error', async () => {
    render(<Scanner />);

    await waitFor(() => {
      const el = screen.queryByTestId('error');
      expect(el).toBeDefined();
    })
  });
});

