import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Users from './pages/Users';
import Register from './pages/Register';
import { Update } from './pages/Update';
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/update" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
