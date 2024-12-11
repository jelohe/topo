import Card from 'react-bootstrap/Card';
import Theme from '@/constants/theme';

function AddButton({ onClick }) {
  const buttonStyle = { 
    backgroundColor: Theme.magenta,
    color: Theme.white,
    cursor: 'cell' 
  };

  const buttonTextStyle = { fontSize: Theme.lg };

  return (
    <Card
      className="AddCard m-3 text-center bg-gradient" 
      style={buttonStyle} 
      onClick={onClick}
    >
      <Card.Body>
        <Card.Title style={buttonTextStyle}>+</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AddButton;
