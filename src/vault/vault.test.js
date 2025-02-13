import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useVault from './vault.js';

describe('vault storage',() => {
  const testSecretOne = "OQYHAM3U"
  const testSecretTwo = "ORSXG5A="

  it('stores a secret on an empty vault', () => {
    const { result } = renderHook(useVault);

    act(() => {
      result.current.update('topo', testSecretOne);
    });

    expect(result.current.vault).toEqual({ topo: testSecretOne });
  });

  it('updates an existing secret', () => {
    const { result } = renderHook(useVault);

    act(() => {
      result.current.update('topo', testSecretOne);
      result.current.update('topo', testSecretTwo);
    });

    expect(result.current.vault).toEqual({ topo: testSecretTwo });
  });

  it('bulk updates an array of uris', () => {
    const { result } = renderHook(useVault);
    const uris = [
      `otpauth://totp/webpage?issuer=topo&secret=${testSecretOne}`,
      `otpauth://totp/webpage?issuer=topo2&secret=${testSecretTwo}`
    ]

    act(() => {
      result.current.bulkUpdate(uris);
    });

    const expectedVault = {
      topo: testSecretOne,
      topo2: testSecretTwo
    };
    expect(result.current.vault).toEqual(expectedVault);
  });
})
