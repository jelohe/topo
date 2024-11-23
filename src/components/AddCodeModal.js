import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Scanner } from '@yudiel/react-qr-scanner';

function AddCodeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card className="bg-primary m-3 text-white text-center" onClick={handleShow}>
        <Card.Body>
          <Card.Title>+</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Secret</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: '550px' }}>
          <p>Scan a secret QR to generate one time passwords</p>
          <Scanner onScan={alert.log} />
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
