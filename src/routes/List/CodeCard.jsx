import { useRef, useState, useEffect } from 'react';
import { TOTP } from 'totp-generator';
import TextScramble from '@/lib/textScramble';

function CodeCard({ name, code }) {
  if (!name || !code) return null;
  const el = useRef(null);

  const pretty = `${code.slice(0, 3)} ${code.slice(3)}`
  const toClip = () => {
    const fx = new TextScramble(el.current);
    fx.setText("Copied!");
    setTimeout(() => fx.setText(pretty), 3000);
  }

  useEffect(() => {
    const fx = new TextScramble(el.current);
    fx.setText(pretty);
  }, [pretty])

  return (
    <>
      <article className="is-fullwidth message is-clickable">
        <div className="message-header is-size-5">
          <p>{name}</p>
        </div>
        <div onClick={toClip} className="message-body">
          <p ref={el} className="is-size-2">{pretty}</p>
        </div>
      </article>
    </>
  );
}

export default CodeCard;
