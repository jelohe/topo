import useVault from '@/useVault'
import { useNavigate } from 'react-router'
import { Scanner } from '@yudiel/react-qr-scanner'

export default function Add() {
  const { vault, bulkInsert } = useVault()
  const navigate = useNavigate()

  function handleScan(uris) {
    if (bulkInsert(uris)) navigate('/');
  }

  return (
    <>
      <h1 className="title">
      Topo Auth
      <button 
        onClick={() => navigate('/')}
        className="button is-pulled-right">back</button></h1>
      <hr />
      <Scanner onScan={handleScan} />
    </>
  );
}
