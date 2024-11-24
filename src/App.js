import { useLocalStorage } from '@uidotdev/usehooks'
import logo from './logo.svg'
import AddCodeModal from './components/AddCodeModal'
import CodeCard from './components/CodeCard'
import './App.css'

function SecretsToCards({ secrets }) {
  return secrets.length
      ? secrets.flatMap(secretToCard)
      : null
}

function secretToCard(secret) {
  return Object.entries(secret).map(([n, s]) => (
    <CodeCard name={n} secret={s} key={n}/>
  ))
}

function App() {
  const [secrets] = useLocalStorage("secrets", "")

  const appStyle = {
    overflowX: 'hidden',
    overflowY: 'auto',
    top: 0,
    bottom: 0
  }

  return (
    <>
    <div className="App">
      <div className="fixed-top" style={appStyle}>
        <SecretsToCards secrets={secrets} />
        <AddCodeModal />
      </div>
      <div className="App-header" style={{ backgroundColor: "#bcbcbc" }}>
        <img src={logo} className="App-logo gradient" alt="logo" />
      </div>
    </div>
    </>
  )
}

export default App
