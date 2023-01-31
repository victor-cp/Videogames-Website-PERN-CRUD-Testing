import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { CreateVideogame } from "./containers/CreateVideogame/CreateVideogame";
import HomePage from "./containers/HomePage/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import Search from "./containers/Search/Search";
import VideogameDetail from "./components/VideogameDetail/VideogameDeatil";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGenres } from "./redux/actions/actions";

import axios from "axios";
axios.defaults.baseURL = "https://deploy-production-bc78.up.railway.app/";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route exact path="/home" component={HomePage} />

          <Route path="/search/:name" component={Search} />

          <Route
            path="/detail/:id"
            render={({ match }) => <VideogameDetail id={match.params.id} />}
          />

          {/* <Route component={NavBar} /> */}
          {/* <Route path="/create" component={NavBar} /> */}
          <Route path="/create" component={CreateVideogame} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
