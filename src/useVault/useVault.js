import { useLocalStorage } from '@uidotdev/usehooks'

export default function useVault() {
  const [vault, setVault] = useLocalStorage('secrets', {});

  return {
    vault,

    update: function(key, value) {
      setVault({ ...vault, [key]: value })
    },

    bulkUpdate: function(uris) {
      const scannedSecrets = uris.reduce(aggregateValid, {}) 
      function aggregateValid(acc, uri) {
        return ({...acc, ...extractFromUri(uri.rawValue)})
      }
      const hasScannedSecrets = Object.keys(scannedSecrets).length

      if (hasScannedSecrets) {
        setVault({ ...vault, ...scannedSecrets })
      }

      return hasScannedSecrets;
    },
  };
}

export function extractFromUri(uri) {
  const params = new URLSearchParams(uri.split("?").pop())
  const name = params.get('issuer')
  const secret = params.get('secret')

  return name && secret
    ? { [name]: secret }
    : {}
}
