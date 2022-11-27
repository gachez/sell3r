import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import SalesPage from "./App";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesPage/>}>
        </Route>
        <Route path="/admin" element={<Admin/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);