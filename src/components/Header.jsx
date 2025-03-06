export default function Header({ children }) {
  return (
    <>
      <h1 className="title">
        <img src="/images/logo.svg" alt="qr-icon" width="35" height="35" />
        <span className="ml-2">Topete</span>
        <div className="is-pulled-right">
          {children}
        </div>
      </h1>
      <hr />
    </>
  );
}
