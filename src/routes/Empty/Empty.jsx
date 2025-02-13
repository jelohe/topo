import useVault from '@/useVault'
import { useNavigate } from 'react-router'

export default function Empty() {
  const { vault, bulkInsert } = useVault()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="title">
        Topo Auth
      </h1>
      <hr/>
      <div className="content is-medium">
        <p>
          Topo allows you to store <span className="has-text-primary">Secrets</span> and generate temporary access <span className="has-text-primary">Codes</span>.
        </p>
        <p>
          Secrets are usually provided as <span className="has-text-primary">QR Codes</span>. The safest backup for this secrets is to store a paper print of the QR or an image file in a safe digital storage.
        </p>
        <p>Start by scanning a QR code to store your first secret.</p>
        <i className="fa-solid fa-qrcode"></i>
      </div>
    </>
  );
}
