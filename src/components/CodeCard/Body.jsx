import Theme from '../../constants/theme';
import Card from 'react-bootstrap/Card';

function CodeCardBody({ code }) {
  const codeStyle = { 
    letterSpacing: Theme.sm,
    fontSize: Theme.lg 
  };

  return (
    <Card.Body>
      <Card.Title style={codeStyle}>{code}</Card.Title>
    </Card.Body>
  )
}

export default CodeCardBody
