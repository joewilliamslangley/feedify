import Login from "./Login"
import Dashboard from "./Dashboard"
import BrandBar from "./BrandBar"
import './App.css'

const code = new URLSearchParams(window.location.search).get("code")
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000';

function App() {
  console.log(API_ENDPOINT)
  return (
    <div className="app">
      <BrandBar />
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
    )
}

export default App
