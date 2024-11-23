import { useLocalStorage } from '@uidotdev/usehooks';
import logo from './logo.svg';
import AddCodeModal from './components/AddCodeModal';
import CodeCard from './components/CodeCard';
import './App.css';

function App() {
  const [secrets] = useLocalStorage("secrets", "");
  const secretCards = secrets.length
      ? secrets.flatMap(obj => (
        Object.entries(obj).map(([n, s]) => <CodeCard name={n} secret={s} key={n}/>)
      ))
      : null;

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
        {secretCards}
        <AddCodeModal />
      </div>
      <div className="App-header" style={{ backgroundColor: "#bcbcbc" }}>
        <img src={logo} className="App-logo gradient" alt="logo" />
      </div>
    </div>
    </>
  );
}

export default App;
