function CodeCard({ name, code }) {
  const pretty = `${code.slice(0, 3)} ${code.slice(3)}`
  const toClip = () => {
    navigator.clipboard.writeText(code);
  }

  if (!name || !code) return null;
  return (
    <>
      <article className="card-wrapper">
        <div className="card-header">
          <p>{name}</p>
        </div>
        <div onClick={toClip} className="card-body">
          <p className="is-size-2">{pretty}</p>
        </div>
      </article>
    </>
  );
}

export default CodeCard;
