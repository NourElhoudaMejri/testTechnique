import React from "react";
import { Route } from "react-router-dom";
import register from "./components/register";
import login from "./components/login";
import weather from "./components/weather";

class Routes extends React.Component {
  render() {
    return (
      <div className="routes-main">    
      <Route exact path="/register" component={register} />    
         <Route exact path="/login" component={login} />
        <Route exact path="/weather" component={weather} /> 
      </div>
    );
  }
}

export default Routes;