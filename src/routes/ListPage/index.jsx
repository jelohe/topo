import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { useLocalStorage } from '@uidotdev/usehooks'
import { TOTP } from 'totp-generator';
import CodeCard from './components/CodeCard'

const TIMEOUT_S = 30
const TIMEOUT_MS = TIMEOUT_S * 100

function generateCodes(secrets) {
  function generateRawCode(secret) {
    const config = { encoding: 'ascii', period: TIMEOUT_S }
    const { otp } = TOTP.generate(secret, config)
    return otp
  }

  const rawCodes = Object
    .entries(secrets)
    .map(([k, v]) => [k, generateRawCode(v)])

  return Object.fromEntries(rawCodes)
}

function ListPage() {
  const [secrets] = useLocalStorage("secrets", "")
  const [codes, setCodes] = useState(generateCodes(secrets));
  const navigate = useNavigate()

  useEffect(() => { 
    const codesInterval = setInterval(() => 
      setCodes(generateCodes(secrets)), TIMEOUT_MS)
    return () => clearInterval(codesInterval)
  }, [secrets])

  return (
    <>
      <h1 className="title">Topo Auth</h1>
      <hr />
      <div className="content has-text-centered">
        <CodeList codes={codes} />
      </div>
      <button
        onClick={() => navigate('/add')}
        className="button is-primary is-large is-fullwidth">+</button>
    </>
  )
}

function CodeList({ codes }) {
  return Object
    .keys(codes)
    .map(name => (
      <CodeCard name={name} key={name} code={codes[name]} />
    ))
}

export default ListPage
