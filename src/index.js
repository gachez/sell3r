import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import SalesPage from "./App";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { ProSidebarProvider } from 'react-pro-sidebar';

export default function App() {
  return (
    <ProSidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}>
          </Route>
          <Route path="/sp/:username/:id" element={<SalesPage/>}>
          </Route>
          <Route path="/seller/shop" element={<Admin/>}>
          </Route>
          <Route path="/dashboard" element={<Dashboard/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </ProSidebarProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);