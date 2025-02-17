import { useLocalStorage } from '@uidotdev/usehooks'

export default function useVault() {
  const [vault, setVault] = useLocalStorage('secrets', {});

  function update(key, value) {
    setVault({ ...vault, [key]: value })
  }

  function bulkUpdate(uris) {
    const scannedSecrets = uris.reduce(aggregateValid, {}) 
    function aggregateValid(acc, uri) {
      return ({...acc, ...extractFromUri(uri)})
    }
    const hasScannedSecrets = Object.keys(scannedSecrets).length

    if (hasScannedSecrets) {
      setVault({ ...vault, ...scannedSecrets })
    }

    return hasScannedSecrets;
  }

  return { vault, update, bulkUpdate }
}

export function extractFromUri(uri) {
  const params = new URLSearchParams(uri.split("?").pop())
  const name = params.get('issuer')
  const secret = params.get('secret')

  return name && secret
    ? { [name]: secret }
    : {}
}
