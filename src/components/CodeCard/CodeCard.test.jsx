import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import CodeCard from "./index";

describe('CodeCard component:',() => {
  const secret = "OQYHAM3U"; // t0p3t -> base32
  afterEach(cleanup);

  it('should render nothing if the parameters makes no sense', () => {
    const providingNothing = CodeCard({ foo: 'bar' });
    const notProvidingName = CodeCard({ secret: '[redacted]' });
    const notProvidingSecret = CodeCard({ name: 'My name' });

    expect(providingNothing).toBe(null);
    expect(notProvidingName).toBe(null);
    expect(notProvidingSecret).toBe(null);
  });

  it('should render the name and generate a code', () => {
    render(<CodeCard name="My name" secret={secret} />);
    screen.getByText('My name');

    const regex = /\b\d{3} \d{3}\b/; // '531 379'
    screen.getByText(regex);
  });
});
