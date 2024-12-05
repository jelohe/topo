import { useLocalStorage } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router'
import { Scanner } from '@yudiel/react-qr-scanner'

function AddSecret() {
  const [secrets, updateSecrets] = useLocalStorage("secrets", "")
  const navigate = useNavigate()

  function handleScan(uris) {
    const scannedSecrets = uris.reduce(groupValids, {}) 
    const areSecrets = Object.keys(scannedSecrets).length

    if (areSecrets) {
      updateSecrets({ ...secrets, ...scannedSecrets })
      navigate("/")
    }
  }

  function groupValids(secrets, uri) {
    return { ...secrets, ...parse(uri) }
  }

  function parse(uri) {
    const rawParms = uri.rawValue.split("?").pop()
    const params = new URLSearchParams(rawParms)
    const name = params.get('issuer')
    const secret = params.get('secret')

    return name && secret
      ? { [name]: secret }
      : {}
  }

  return (
    <div>
      <Scanner onScan={handleScan} />
    </div>
  );
}

export default AddSecret;
