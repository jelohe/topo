import { useNavigate } from 'react-router';
import { Scanner } from '@yudiel/react-qr-scanner';
import Header from '@/Header';
import useVault from '@/useVault';

export default function Add() {
  const { bulkUpdate } = useVault();
  const navigate = useNavigate();

  function handleScan(uris) {
    if (bulkUpdate(uris)) navigate('/');
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
