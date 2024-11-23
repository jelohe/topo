import logo from './logo.svg';
import AddCodeModal from './components/AddCodeModal';
import CodeCard from './components/CodeCard';
import './App.css';

function App() {
  return (
    <>
    <div className="App">
      <div className="fixed-top">
        <CodeCard name="Topete" />
        <CodeCard name="GitHub" />
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
