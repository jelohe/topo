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
    <div className="App-header" style={{ backgroundColor: "#bcbcbc" }}>
      <Scanner onScan={handleScan} />
    </div>
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
