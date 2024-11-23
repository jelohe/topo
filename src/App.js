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

  return (
    <>
    <div className="App">
      <div className="fixed-top">
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
