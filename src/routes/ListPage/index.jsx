import { useNavigate } from 'react-router'
import { useLocalStorage } from '@uidotdev/usehooks'
import logo from '@/assets/logo-pink.svg'
import Theme from '@/constants/theme'
import AddButton from './components/AddButton'
import CodeCard from './components/CodeCard'

function ListPage() {
  const [secrets] = useLocalStorage("secrets", "")
  const navigate = useNavigate()

  const style = {
    overflowX: 'hidden',
    overflowY: 'auto',
    top: 0,
    bottom: 0
  }

  return (
    <>
    <div className="App">
      <CodeList secrets={secrets} />
      <AddButton onClick={() => navigate('/add')} />
    </div>
    </>
  )
}

function CodeList({ secrets }) {
  return Object
    .keys(secrets)
    .map(name => (
      <CodeCard name={name} key={name} secret={secrets[name]} />
    ))
}

export default ListPage