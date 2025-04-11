import { useState } from 'react';
import ExportQR from './ExportQR';

function CodeCard({ name, code, secret }) {
  const [showModal, setShowModal] = useState(false);
  const pretty = `${code.slice(0, 3)} ${code.slice(3)}`
  const toClip = () => {
    navigator.clipboard.writeText(code);
  }

  if (!name || !code) return null;

  const uri = `otpauth://totp/webpage?issuer=${name}&secret=${secret}`;

  return (
    <>
    {showModal &&
      <ExportQR
        name={name}
        value={uri}
        onBack={() => setShowModal(false)}
      />
    }

      <article className="card-wrapper">
        <div className="card-header">
          <p>{name}</p>

          <button onClick={() => setShowModal(true)} className="export-qr-button black-button">
            <img src="/images/qr.svg" alt="qr-icon" width="20" height="20" />
          </button>
        </div>
        <div onClick={toClip} className="card-body">
          <p className="is-size-2">{pretty}</p>
        </div>
      </article>
    </>
  );
}

export default CodeCard;
