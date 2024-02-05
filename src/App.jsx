//react-router-dom
import { Outlet } from "react-router-dom";

//styles
import "./App.css";

function App() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export default App;
