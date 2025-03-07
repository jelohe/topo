import { useNavigate } from 'react-router'
import Header from '@/components/Header';

export default function Empty() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="content is-medium">
        <p>
          Topo allows you to store <span className="has-text-primary">Secrets</span> and generate temporary access <span className="has-text-primary">Codes</span> for two factor authentication.
        </p>
        <p>
          Secrets are usually provided as <span className="has-text-primary">QR Codes</span>. You should keep the QR image somewhere safe as a backup.
        </p>
        <p>Start by scanning a QR code to store your first secret.</p>
      </div>
      <button
          onClick={() => navigate('/add')}
          data-testid="scan-first-qr"
          className="button is-primary is-fullwidth">
        <img src="/images/qr.svg" alt="qr-icon" width="35" height="35" />
      </button>
    </>
  );
}
