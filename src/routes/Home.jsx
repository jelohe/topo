import { useNavigate } from 'react-router'
import logo from '../assets/logo-pink.svg'
import AddCodeCard from '../components/AddCodeCard'
import CodeCard from '../components/CodeCard'
import { useLocalStorage } from '@uidotdev/usehooks'
import Theme from './../constants/theme'

function Home() {
  const [secrets] = useLocalStorage("secrets", "")
  const navigate = useNavigate()

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
        <CodeCards secrets={secrets} />
        <AddCodeCard onClick={() => navigate('/add')} />
      </div>
      <div className="App-header" style={{ backgroundColor: Theme.gray14 }}>
        <img src={logo} className="App-logo gradient" alt="logo" />
      </div>
    </div>
    </>
  )
}

function CodeCards({ secrets }) {
  return Object
    .keys(secrets)
    .map(name => (
      <CodeCard name={name} key={name} secret={secrets[name]} />
    ))
}

export default Home
