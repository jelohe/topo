import QRCode from 'react-qr-code';

export default function ExportQR({ name = '', value, onBack = () => {} }) {
  if (!value) return null;

  return (
    <div className="popup-background">
      <div className="popup-body">
        <h1 className="page-header">
          {name}
          <button 
            onClick={onBack}
            className="black-button page-header-right"
          >
            back
          </button>
        </h1>
        <hr />
        <div className="qr-padding">
          <QRCode value={value} />
        </div>
      </div>
    </div>
  );
}
