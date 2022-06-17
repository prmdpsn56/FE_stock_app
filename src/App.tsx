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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notifyError  = () => {
    toast.error("No data found for that company!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500,
      hideProgressBar: true,
    });
  }
  const success = () => {
    toast.success("Company Record Deleted", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500,
      hideProgressBar: true,
    });
  }
  return (
    <div>
    <ToastContainer limit={2}/>
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
          <Details notifyError={notifyError} notifySuccess={success}/>
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
