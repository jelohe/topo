import { useLocalStorage } from '@uidotdev/usehooks'

export default function useVault() {
  const [vault, setVault] = useLocalStorage('secrets', {});

  return {
    vault,

    update: function(key, value) {
      setVault({ ...vault, [key]: value })
    },

    bulkUpdate: function(uris) {
      const scannedSecrets = uris.reduce((acc, uri) => (
        { ...acc, ...extractFromUri(uri.rawValue) }
      ), {});

      const hasScannedSecrets = Object.keys(scannedSecrets).length;
      if (hasScannedSecrets) 
        setVault({ ...vault, ...scannedSecrets })

      return hasScannedSecrets;
    },

    remove: function(secretName) {
      const newVault = { ...vault };
      delete(newVault[secretName]);
      setVault(newVault);
    },
  };
}

function extractFromUri(uri) {
  const params = new URLSearchParams(uri.split("?").pop())
  const name = params.get('issuer')
  const secret = params.get('secret')

  return name && secret
    ? { [name]: secret }
    : {}
}
