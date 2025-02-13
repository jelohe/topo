import { useState, useEffect } from 'react';
import { TOTP } from 'totp-generator';

function CodeCard({ name, code }) {
  if (!name || !code) return null;

  const toClip = () => navigator.clipboard.writeText(code)
  const pretty = `${code.slice(0, 3)} ${code.slice(3)}`

  return (
    <article className="message">
      <div className="message-header is-size-5">
        <p>{name}</p>
      </div>
      <button onClick={toClip} className="button is-fullwidth message-body">
        <p className="is-size-2">{pretty}</p>
      </button>
    </article>
  );
}

export default CodeCard;
