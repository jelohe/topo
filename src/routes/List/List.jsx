import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useVault from '@/useVault';
import { TOTP } from 'totp-generator';
import Empty from './components/Empty';
import CodeCard from './components/CodeCard';
import Header from '@/components/Header';

const CYCLE_S = 30;
const CYCLE_MS = CYCLE_S * 1000;
const ANIMATION_INTERVAL_MS = 20;

function generateCodes(vault) {
  function generateRawCode(secret) {
    const config = { encoding: 'ascii', period: CYCLE_S };
    const { otp: code } = TOTP.generate(secret, config);
    return code;
  }

  const rawCodes = Object.entries(vault)
    .map(([k, v]) => [k, generateRawCode(v)]);

  return Object.fromEntries(rawCodes);
}

export default function List() {
  const { vault } = useVault();
  const [codes, setCodes] = useState(generateCodes(vault));
  const [elapsedMs, setElapsed] = useState(0);

  useEffect(() => {
    const frame = () => setElapsed(prev => {
      let next = prev + ANIMATION_INTERVAL_MS;

      if (prev >= CYCLE_MS) {
        setCodes(generateCodes(vault));
        next = 0;
      }

      return next;
    })

    const id = setInterval(frame, ANIMATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, [vault]);

  if (Object.entries(vault).length <= 0) {
    return (<Empty />);
  }

  return (
    <>
      <progress 
        className="progress time-bar is-primary" 
        value={elapsedMs}
        max={CYCLE_MS}
      />

      <Header>
        <HomeButton />
      </Header>

      <div className="content has-text-centered">
        {
          Object.entries(codes).map(([name, code]) => (
            <CodeCard name={name} key={name} code={code} />
          ))
        }
      </div>
    </>
  );
}

function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/add')}
      className="button is-primary is-fullwidth"
    >
      <img src="/images/qr.svg" alt="qr-icon" width="20" height="20" />
    </button>
  );
}
