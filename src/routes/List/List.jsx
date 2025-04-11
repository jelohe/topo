import { useState } from 'react';
import useVault from '@/useVault';
import { useNavigate } from 'react-router';
import { TOTP } from 'totp-generator';
import FirstUse from './components/FirstUse';
import CodeCard from './components/CodeCard';
import Timebar from './components/Timebar';
import Header from '@/Header';

const REGENERATION_SECONDS = 30;

export default function List() {
  const navigate = useNavigate();
  const { vault } = useVault();
  const [codes, setCodes] = useState(generateCodes(vault));

  const hasSecrets = Object.entries(vault).length > 0;
  if (!hasSecrets) return (<FirstUse />);

  return (
    <>
      <Timebar
        cycleSeconds={REGENERATION_SECONDS}
        onCycleEnd={() => setCodes(generateCodes(vault))}
      />
      <Header>
        <button data-testid="add-qr-button" onClick={() => navigate('/add')} className="add-qr-button">+</button>
      </Header>

      <div>
        {
          Object.entries(codes).map(([name, code]) => (
            <CodeCard name={name} key={name} code={code} secret={vault[name]} />
          ))
        }
      </div>
    </>
  );
}

function generateCodes(vault) {
  const rawCodes = Object.entries(vault)
    .map(([name, secret]) => [name, generateRawCode(secret)]);
 
  return Object.fromEntries(rawCodes);
}

function generateRawCode(secret) {
  const config = { encoding: 'ascii', period: REGENERATION_SECONDS };
  const { otp: code } = TOTP.generate(secret, config);
  return code;
}
