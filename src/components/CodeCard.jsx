import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { TOTP } from 'totp-generator';
import Theme from '../constants/theme';

function CodeCard({ name, secret }) {
  if (!name || !secret) return null;

  const cardStyle = {
    backgroundColor: Theme.gray15,
    color: Theme.black,
    cursor: 'alias'
  };

  const pollingTime = 30000
  const [code, setCode] = useState(generateRawCode(secret));
  useEffect(() => { 
    setInterval(() => setCode(generateRawCode(secret)), pollingTime)
  })

  const toClipboard = _ => navigator.clipboard.writeText(code);

  return (
    <Card className="CodeCard m-3" style={cardStyle} onClick={toClipboard}>
      <CodeCardHeader name={name} />
      <CodeCardBody code={rawToPretty(code)} />
    </Card>
  );
}

function CodeCardHeader({ name }) {
  const headerStyle = {
    fontWeight: 'thin',
    fontStyle: 'italic',
    letterSpacing: '2px',
    fontSize: Theme.md
  };
  return <Card.Header style={headerStyle}>{name}</Card.Header>
}

function CodeCardBody({ code }) {
  const codeStyle = { letterSpacing: Theme.sm, fontSize: Theme.lg };
  return (
    <Card.Body>
      <Card.Title style={codeStyle}>{code}</Card.Title>
    </Card.Body>
  )
}

function rawToPretty(code) {
  return `${code.slice(0, 3)} ${code.slice(3)}`
}

function generateRawCode(secret) {
  const config = { encoding: 'ascii' }
  const { otp } = TOTP.generate(secret, config)
  return otp
}

export default CodeCard;
