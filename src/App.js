import logo from './logo.svg';
import Card from 'react-bootstrap/Card';
import './App.css';

function CodeCard({ name, code }) {
  return (
    <Card className="m-3 bg-secondary text-white">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{code}</Card.Title>
      </Card.Body>
    </Card>
  );
}

function AddCodeCard() {
  return (
    <Card className="bg-primary m-3 text-white">
      <Card.Body>
        <Card.Title>+</Card.Title>
      </Card.Body>
    </Card>
  )
}

function App() {
  return (
    <div className="App">
      <div className="fixed-top">
        <CodeCard name="Github" code="321654" />
        <CodeCard name="Google" code="987645" />
        <AddCodeCard />
      </div>
      <div className="App-header bg-dark">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
}

export default App;
