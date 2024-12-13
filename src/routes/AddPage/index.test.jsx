import { cleanup } from "@testing-library/react"
import { afterEach, describe, it, expect } from "vitest"
import { extractSecret } from "./"

describe('extractSecret from uri',() => {
  const secret = "OQYHAM3U" // t0p3t -> base32

  afterEach(cleanup)

  it('returns nothing when provided an invalid URL', () => {
    const invalidUri = 'www.test.web'
    expect(extractSecret(invalidUri)).toEqual({})
  })

  it('returns nothing when the issuer is missing', () => {
    const invalidUri = `otpauth://totp/webpage?secret=${secret}`
    expect(extractSecret(invalidUri)).toEqual({})
  })

  it('returns nothing when the secret is missing', () => {
    const invalidUri = `otpauth://totp/webpage?issuer=topo`
    expect(extractSecret(invalidUri)).toEqual({})
  })

  it('extracts a single secret', () => {
    const validUri = `otpauth://totp/webpage?issuer=topo&secret=${secret}`
    const validSecret = { topo: secret }

    expect(extractSecret(validUri)).toEqual(validSecret)
  })

  it('extracts multiple secrets', () => {
    const validUri = `otpauth://totp/webpage?issuer=topo&secret=${secret}`
    const validSecret = { topo: secret }

    expect(extractSecret(validUri)).toEqual(validSecret)
  })
})
