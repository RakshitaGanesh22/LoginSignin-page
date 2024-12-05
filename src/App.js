// App.js
import './App.css';
import React from 'react';
import { ThemeProviderCustom } from "./components/theme";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from './components/signup';
import Login from './components/login';
import EntryPage from './components/entryPage';
function App() {
  return (
    <ThemeProviderCustom>
      <div className="App">
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<EntryPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </div>
    </ThemeProviderCustom>
  );
}

export default App;