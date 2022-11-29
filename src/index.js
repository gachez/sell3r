import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import SalesPage from "./App";
import { Login } from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}>
        </Route>
        <Route path="/sp/:username/:id" element={<SalesPage/>}>
        </Route>
        <Route path="/admin" element={<Admin/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);