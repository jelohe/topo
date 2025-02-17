import { useNavigate } from 'react-router';
import { Scanner } from '@yudiel/react-qr-scanner';
import Header from '@/Header';
import useVault from '@/useVault';

export default function Add() {
  const { bulkInsert } = useVault();
  const navigate = useNavigate();

  function handleScan(uris) {
    if (bulkInsert(uris)) navigate('/');
  }

  return (
    <>
      <Header>
        <button onClick={() => navigate('/')} className="button">
            back
        </button>
      </Header>

      <Scanner onScan={handleScan} />
    </>
  );
}
