import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Scanner } from '@yudiel/react-qr-scanner';
import Theme from './../constants/theme';

function AddCodeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleScan = codes => {
    codes.forEach(code => {
      const rawParms = code.rawValue.split("?").pop();
      const params = new URLSearchParams(rawParms);

      localStorage.setItem(params.get("issuer"), params.get("secret"));
    })
  }

  const buttonStyle = { backgroundColor: Theme.gray04, color: Theme.white, cursor: 'cell' };
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
