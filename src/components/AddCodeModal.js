import { useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Scanner } from '@yudiel/react-qr-scanner';
import Theme from './../constants/theme';

function AddCodeModal() {
  const [show, setShow] = useState(false);
  const [secrets, updateSecrets] = useLocalStorage("secrets", "");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleScan = codes => {
    const newSecrets = codes.reduce((secretsToAdd, secretURI) => {
      const rawParms = secretURI.rawValue.split("?").pop();
      const params = new URLSearchParams(rawParms);

      secretsToAdd.push({ [params.get('issuer')]: params.get("secret") });

      return secretsToAdd;
    }, []);
    
    if (newSecrets) {
      const currentSecrets = Object.assign({}, ...secrets);
      const incomingSecrets = Object.assign({}, ...newSecrets);
      const mergedSecrets = { ...currentSecrets, ...incomingSecrets };

      updateSecrets(Object.entries(mergedSecrets).map(([key, value]) => ({ [key]: value })));
    }
  }

  const buttonStyle = { backgroundColor: Theme.magenta, color: Theme.white, cursor: 'cell' };
  const buttonTextStyle = { fontSize: Theme.lg };

  return (
    <div>
      <Card
        className="AddCard m-3 text-center bg-gradient" 
        style={buttonStyle} 
        onClick={handleShow}
      >
        <Card.Body>
          <Card.Title style={buttonTextStyle}>+</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Secret</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Scan a secret QR to generate one time passwords</p>
          <Scanner onScan={handleScan} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddCodeModal;
