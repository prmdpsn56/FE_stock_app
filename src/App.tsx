import React from "react";
import "./App.scss";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Banner } from "./components/banner/Banner";
import { Stocks } from "./components/stocks/Stocks";
import { Route, Switch, Redirect } from "react-router-dom";
import { Details } from './components/companyDetails/Details';
import { Register } from './components/register/Register';
import { Notfound } from './components/not-found/Notfound';

function App() {
  return (
    <div>
    <Header />
    <Banner />
    <Switch>
    <Route path="/" exact>
      <Redirect to='/companies'/>
    </Route>
    <Route path="/companies" exact>
          <Stocks />
    </Route>
    <Route path="/register" exact>
          <Register />
    </Route>
    <Route path="/info/:code" exact>
        <Details/>
    </Route>
    <Route path="*">
          < Notfound/>
    </Route>
  </Switch>
      <Footer />
    </div>
  );
}

export default App;
