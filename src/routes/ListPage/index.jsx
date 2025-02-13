import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useVault from '@/vault';
import { TOTP } from 'totp-generator';
import CodeCard from './components/CodeCard'

const CYCLE_S = 30
const CYCLE_MS = CYCLE_S * 1000
const ANIMATION_INTERVAL_MS = 20

function generateCodes(vault) {
  function generateRawCode(secret) {
    const config = { encoding: 'ascii', period: CYCLE_S }
    const { otp } = TOTP.generate(secret, config)
    return otp
  }

  const rawCodes = Object
    .entries(vault)
    .map(([k, v]) => [k, generateRawCode(v)])

  return Object.fromEntries(rawCodes)
}

function ListPage() {
  const { vault } = useVault();
  const [codes, setCodes] = useState(generateCodes(vault));
  const [elapsedMs, setElapsed] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const frame = () => setElapsed(prev => {
      let next = prev + ANIMATION_INTERVAL_MS

      if (prev >= CYCLE_MS) {
        setCodes(generateCodes(vault))
        next = 0
      }

      return next
    })

    const id = setInterval(frame, ANIMATION_INTERVAL_MS)
    return () => clearInterval(id)
  }, [vault])

  return (
    <>
      <h1 className="title">Topo Auth</h1>
      <hr />

      <progress 
        className="progress is-small is-primary" 
        value={elapsedMs}
        max={CYCLE_MS}
      />

      <div className="content has-text-centered">
        {
          Object
          .keys(codes)
          .map(name => (
            <CodeCard name={name} key={name} code={codes[name]} />
          ))
        }
      </div>
      <button
        onClick={() => navigate('/add')}
        className="button is-primary is-fullwidth">+</button>
    </>
  )
}

export default ListPage
