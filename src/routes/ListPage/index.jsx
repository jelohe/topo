import { useNavigate } from 'react-router'
import { useLocalStorage } from '@uidotdev/usehooks'
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
      <h1 class="title">Topo Authenticator</h1>
      <hr />
      <div class="content has-text-centered">
        <CodeList secrets={secrets} />
      </div>
      <button
        onClick={() => navigate('/add')}
        class="button is-primary is-large is-fullwidth">+</button>
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
