import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import SinglePin from "./components/Pins/SinglePinDetails";
import CreatePinModal from "./components/Pins/CreatePinModal";
import UserProfilePage from "./components/UserProfile";
import SingleBoard from "./components/Boards/SingleBoardDetailsPage";
import SplashPage from "./components/SplashPage";
import SearchResultPage from "./components/Search/SearchResult";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (

<>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
              <SplashPage />
            </Route>
          <Route path="/home">
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          </Route>
          <Route path="/pins/new">
            <ProtectedRoute>
              <CreatePinModal />
            </ProtectedRoute>
          </Route>
          <Route path="/pins/:pinId">
            <ProtectedRoute>
              <SinglePin />
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          </Route>
          <Route path="/boards/:boardId">
            <ProtectedRoute>
              <SingleBoard />
            </ProtectedRoute>
          </Route>
          <Route path="/search">
            <ProtectedRoute>
              <SearchResultPage />
            </ProtectedRoute>
          </Route>
        </Switch>
      )}
    </>

  );
}

export default App;
