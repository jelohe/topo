import { useState, useEffect } from 'react';
import { TOTP } from 'totp-generator';

function CodeCard({ name, secret }) {
  if (!name || !secret) return null;

  const [code, setCode] = useState(generateRawCode(secret));

  useEffect(() => { 
    const pollingTime = 30000
    const intervalId = setInterval(() => setCode(generateRawCode(secret)), pollingTime)
    return () => clearInterval(intervalId)
  })

  function generateRawCode(secret) {
    const config = { encoding: 'ascii' }
    const { otp } = TOTP.generate(secret, config)
    return otp
  }
  
  const toClip = () => navigator.clipboard.writeText(code)
  const pretty = `${code.slice(0, 3)} ${code.slice(3)}`

  return (
    <article class="message">
      <div class="message-header is-size-5">
        <p>{name}</p>
      </div>
      <button class="button is-fullwidth message-body">
        <p className="is-size-2">{pretty}</p>
      </button>
    </article>
  );
}

export default CodeCard;
