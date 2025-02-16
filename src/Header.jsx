import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';

export default function Header({ children }) {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="title">
        <img src="/images/logo.svg" alt="qr-icon" width="35" height="35" />
        <span className="ml-2">Topo Auth</span>
        <div className="is-pulled-right">
          {children}
        </div>
      </h1>
      <hr />
    </>
  );
}
