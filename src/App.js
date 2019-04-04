import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./App.css";

import AuthPage from "./pages/Auth";
import EventsPAge from "./pages/Events";
import BookingPage from "./pages/Booking";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/events" component={EventsPAge} />
          <Route path="/bookings" component={BookingPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
