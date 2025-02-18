import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useVault from './useVault.js';

describe('vault storage',() => {
  const topoSecret = "OQYHAM3U"
  const topeteSecret = "ORSXG5A="

  it('stores a secret on an empty vault', () => {
    const { result } = renderHook(useVault);

    act(() => {
      result.current.update('topo', topoSecret);
    });

    expect(result.current.vault).toEqual({ topo: topoSecret });
  });

  it('updates an existing secret', () => {
    const { result } = renderHook(useVault);

    act(() => {
      result.current.update('topo', topoSecret);
      result.current.update('topo', topeteSecret);
    });

    expect(result.current.vault).toEqual({ topo: topeteSecret });
  });

  it('bulk updates an array of uris', () => {
    const { result } = renderHook(useVault);
    const uris = [
      { rawValue: `otpauth://totp/webpage?issuer=topo&secret=${topoSecret}` },
      { rawValue: `otpauth://totp/webpage?issuer=topete&secret=${topeteSecret}` }
    ]

    act(() => {
      result.current.bulkUpdate(uris);
    });

    const expectedVault = {
      topo: topoSecret,
      topete: topeteSecret
    };
    expect(result.current.vault).toEqual(expectedVault);
  });
})
