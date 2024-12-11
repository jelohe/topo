import { useState, useEffect } from 'react';
import { TOTP } from 'totp-generator';
import Card from 'react-bootstrap/Card';
import Theme from '@/constants/theme';
import Header from './Header'
import Body from './Body'

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

  const cardStyle = {
    backgroundColor: Theme.gray15,
    color: Theme.black,
    cursor: 'alias'
  };

  return (
    <Card className="CodeCard m-3" style={cardStyle} onClick={toClip}>
      <Header name={name} />
      <Body code={pretty} />
    </Card>
  );
}

export default CodeCard;
