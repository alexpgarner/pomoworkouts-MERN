import './App.css';
import Header from './components/Header';
import Timer from './components/Timer'
function App() {
  //js here
  return (//jsx from here
    <div className="container">
      <Header className = "header"/>
      <Timer/>
    </div>
  );
}

export default App;
