import { useNavigate } from 'react-router'
import Header from '@/Header';

export default function FirstUse() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="content is-medium">
        <p>
          Topo allows you to store <span className="highlight">Secrets</span> and generate temporary access <span className="highlight">Codes</span> for two factor authentication.
        </p>
        <p>
          Services provide Secrets as <span className="highlight">QR Codes</span>
        </p>
        <p>Start by <span className="highlight">Scanning</span> a QR code to store your first secret.</p>
      </div>
      <button
          onClick={() => navigate('/add')}
          data-testid="scan-first-qr"
          className="add-qr-button full">
        <img src="/images/qr.svg" alt="qr-icon" width="35" height="35" />
      </button>
    </>
  );
}
