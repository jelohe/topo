import { useNavigate } from 'react-router';

export default function AddButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/add')}
      className="button is-primary is-fullwidth"
    >
      <img src="/images/qr.svg" alt="qr-icon" width="20" height="20" />
    </button>
  );
}
