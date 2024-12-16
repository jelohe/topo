import { useLocalStorage } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router'
import { Scanner } from '@yudiel/react-qr-scanner'

function AddPage() {
  const [secrets, updateSecrets] = useLocalStorage("secrets", {})
  const navigate = useNavigate()

  function handleScan(uris) {
    const scannedSecrets = uris.reduce(aggregateValid, {}) 
    const hasScannedSecrets = Object.keys(scannedSecrets).length

    if (hasScannedSecrets) {
      updateSecrets({ ...secrets, ...scannedSecrets })
      navigate("/")
    }
  }

  function aggregateValid(acc, uri) {
    return ({...acc, ...extractSecret(uri.rawValue)})
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

export function extractSecret(uri) {
  const params = new URLSearchParams(uri.split("?").pop())
  const name = params.get('issuer')
  const secret = params.get('secret')

  return name && secret
    ? { [name]: secret }
    : {}
}

export default AddPage;
