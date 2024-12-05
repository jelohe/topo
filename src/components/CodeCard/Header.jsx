import Theme from '../../constants/theme';
import Card from 'react-bootstrap/Card';

function CodeCardHeader({ name }) {
  const headerStyle = {
    fontWeight: 'thin',
    fontStyle: 'italic',
    letterSpacing: '2px',
    fontSize: Theme.md
  };

  return (
    <Card.Header style={headerStyle}>
      {name}
    </Card.Header>
  )
}

export default CodeCardHeader
