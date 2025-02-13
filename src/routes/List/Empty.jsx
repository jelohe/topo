import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';
import TextScramble from '@/lib/textScramble';

export default function Empty() {
  const navigate = useNavigate()

  useEffect(() => {
    const el = document.querySelector('.neo');
    const fx = new TextScramble(el);
    fx.setText("326 629");
  });

  return (
    <>
      <h1 className="title">
        Topo Auth
      </h1>
      <hr/>
      <div className="content is-medium">
        <p>
          Topo allows you to store <span className="has-text-primary">Secrets</span> and generate temporary access <span className="has-text-primary">Codes</span>.
        </p>
        <p>
          Secrets are usually provided as <span className="has-text-primary">QR Codes</span>. The safest backup for this secrets is to store a paper print of the QR or an image file in a safe digital storage.
        </p>
        <p>Start by scanning a QR code to store your first secret.</p>
      </div>
      <button
          onClick={() => navigate('/add')}
          className="button is-primary is-fullwidth">
        <img src="/images/qr.svg" alt="qr-icon" width="35" height="35" />
      </button>
      <p className="neo">
      </p>
    </>
  );
}
