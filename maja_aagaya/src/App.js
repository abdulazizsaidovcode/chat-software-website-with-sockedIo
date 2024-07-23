import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import axios from "axios";

function App() {

  axios.get("http://localhost:3000/api")
  .then((response) => console.log(response))

  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/" element={<Chat></Chat>}></Route>
      <Route path="/setAvatar" element={<SetAvatar></SetAvatar>}/>
    </Routes>
    </BrowserRouter>
  );
}
export default App;
 