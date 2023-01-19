import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import DebtList from "./components/DebtList";
import Add from "./components/Add";
import Update from "./components/Update";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/debtlist" element={<DebtList/>}/>
        <Route path="/add/:userId" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
