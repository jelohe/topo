import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Header from './Header'
import Body from './Body'
import { TOTP } from 'totp-generator';
import Theme from '../../constants/theme';

function CodeCard({ name, secret }) {
  if (!name || !secret) return null;

  const [code, setCode] = useState(generateRawCode(secret));

  useEffect(() => { 
    const pollingTime = 30000
    setInterval(() => setCode(generateRawCode(secret)), pollingTime)
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
