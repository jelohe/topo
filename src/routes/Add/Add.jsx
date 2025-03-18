import { useNavigate } from 'react-router';
import Header from '@/Header';
import useVault from '@/useVault';
import Scanner from '@/Scanner';

export default function Add() {
  const { bulkUpdate } = useVault();
  const navigate = useNavigate();

  function handleScan(uris) {
    const somethingUpdated = bulkUpdate(uris);
    if (somethingUpdated) navigate('/');
  }

  return (
    <>
      <Header>
        <button onClick={() => navigate('/')} className="back-button">
          back
        </button>
      </Header>
      <Scanner onScan={handleScan} />
    </>
  );
}
