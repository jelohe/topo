import Card from 'react-bootstrap/Card';
import { TOTP } from 'totp-generator';
import Theme from '../constants/theme';

function CodeCard({ name }) {
  const secret = localStorage.getItem(name);
  if (!secret) return null;

  const { otp: rawCode } = TOTP.generate(secret, { encoding: "ascii" })
  const prettyCode = rawCode.slice(0,3) + " " + rawCode.slice(3);

  const cardStyle = {
    backgroundColor: Theme.gray15,
    color: Theme.black,
    cursor: 'alias'
  };
  const headerStyle = {
    fontWeight: 'thin',
    fontStyle: 'italic',
    letterSpacing: '2px',
    fontSize: Theme.md
  };
  const codeStyle = { letterSpacing: Theme.sm, fontSize: Theme.lg };
  const toClipboard = _e => navigator.clipboard.writeText(rawCode);

  return (
    <Card className="CodeCard m-3" style={cardStyle} onClick={toClipboard}>
      <Card.Header style={headerStyle}>{name}</Card.Header>
      <Card.Body>
        <Card.Title style={codeStyle}>{prettyCode}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CodeCard;
