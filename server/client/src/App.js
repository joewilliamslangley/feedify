import Login from "./Login"
import Dashboard from "./Dashboard"
import BrandBar from "./BrandBar"
import './App.css'

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return (
    <div className="app">
      <BrandBar />
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
    )
}

export default App
