import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';

export default function Empty() {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="title">
        <img src="/images/logo.svg" alt="qr-icon" width="35" height="35" />
        <span className="ml-2">Topo Auth</span>
      </h1>
      <div className="content is-medium">
        <p>
          Topo allows you to store <span className="has-text-primary">Secrets</span> and generate temporary access <span className="has-text-primary">Codes</span> for two factor authentication.
        </p>
        <p>
          Secrets are usually provided as <span className="has-text-primary">QR Codes</span>. You should keep the QR image somewhere safe as a backup.
        </p>
        <p>Start by scanning a QR code to store your first secret.</p>
      </div>
      <button
          onClick={() => navigate('/add')}
          className="button is-primary is-fullwidth">
        <img src="/images/qr.svg" alt="qr-icon" width="35" height="35" />
      </button>
    </>
  );
}
