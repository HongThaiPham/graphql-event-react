import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./App.scss";

import AuthPage from "./pages/Auth";
import EventsPAge from "./pages/Events";
import BookingPage from "./pages/Booking";

import MainNavigation from "./components/Navigation/MainNavigation";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
              <Route path="/events" component={EventsPAge} />
              <Route path="/bookings" component={BookingPage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
