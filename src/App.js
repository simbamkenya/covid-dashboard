import Dash from './components/Dash'
import Map from './components/Map'
import './App.css';
import LineChart from './components/LineChart';

function App() {
  return (
    <div className="antialiased text-gray-900">
      {/* <Map />
      <LineChart /> */}
      <Dash />
    </div>
  );
}

export default App;
