import {BrowserRouter , Routes , Route} from "react-router-dom"
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Netflix from "./pages/Netflix/Netflix";
import { Player } from "./pages/Player/Player";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import { UserLiked } from "./pages/UserLiked/UserLiked";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Netflix />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="tv" element={<TVShows />} />
        <Route path="/player" element={<Player />} />
        <Route path="/myList" element={<UserLiked />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
