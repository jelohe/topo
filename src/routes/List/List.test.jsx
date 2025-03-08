import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import List from './List';

describe('when vault is empty', () => {
  afterEach(cleanup);

  it('shows the information text', async () => {
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    let textElements = await screen.queryAllByText(/qr codes/i);
    expect(textElements.length).toBeGreaterThan(0);
    textElements = await screen.queryAllByText(/secrets/i);
    expect(textElements.length).toBeGreaterThan(0);
  });

  it('provides a button to scan secrets', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    await fireEvent.click(getByRole('button'))

    expect(window.location.pathname).toBe('/add');
  });
});

describe('when vault has secrets', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('shows one code card', async () => {
    const vault = { topo: 'toposecret' };
    window.localStorage.setItem('secrets', JSON.stringify(vault));

    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    await waitFor(() => {
      const codes = screen.getAllByText(/\d{3} \d{3}/);
      expect(codes.length).toBe(1);
    })
  });

  it('shows multiple code card', async () => {
    const vault = { topo: 'toposecret', topete: 'topetesecret' }
    window.localStorage.setItem('secrets', JSON.stringify(vault));

    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    await waitFor(() => {
      const codes = screen.getAllByText(/\d{3} \d{3}/);
      expect(codes.length).toBe(2);
    })
  });

  it('provides a button to scan secrets', async () => {
    const vault = { topo: 'toposecret', topete: 'topetesecret' }
    window.localStorage.setItem('secrets', JSON.stringify(vault));
    const { getByRole } = render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    await fireEvent.click(getByRole('button'))

    expect(window.location.pathname).toBe('/add');
  });
});
