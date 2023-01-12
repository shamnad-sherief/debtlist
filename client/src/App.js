import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import DebtList from "./components/DebtList";
import Add from "./components/Add";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DebtList/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
