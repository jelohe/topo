import logo from './logo.svg';
import Card from 'react-bootstrap/Card';
import AddCodeModal from './components/AddCodeModal';
import { TOTP } from 'totp-generator';
import './App.css';

function CodeCard({ name }) {
  const { otp: newCode } = TOTP.generate("TESTCODE")

  return (
    <Card className="m-3 bg-secondary text-white">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{newCode}</Card.Title>
      </Card.Body>
    </Card>
  );
}

function App() {
  return (
    <>
    <div className="App">
      <div className="fixed-top">
        <CodeCard name="Test Integration 1" />
        <AddCodeModal />
      </div>
      <div className="App-header bg-dark">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
    </>
  );
}

export default App;
