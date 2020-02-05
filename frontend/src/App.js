import React, { Component } from "react";
import "./App.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Switch, Route } from "react-router-dom";
import Header from './components/header'
// import Header2 from './components/header2'
import Home from './pages/home'
import Catalogs1 from './pages/catalogs1'
import Catalogs2 from './pages/catalogs2'
import Catalogs3 from './pages/catalogs3'
// import ViewDetail from './pages/viewdetail'
import Register from './pages/signup'
import Login from './pages/signin'


class App extends Component {
  state = { 
    loading:true
   }

   componentDidMount(){
     this.setState({loading:false})
   }

  render() { 
    if(this.state.loading){
      return <div>
        loading...
      </div>
    }
    return ( 
      <div >
        <Header/>
        {/* <Header2/> */}
        <Switch>
          <Route path={"/"} exact component={Home}/>
          <Route path={"/catalogs1"} exact component={Catalogs1}/>
          <Route path={"/catalogs2"} exact component={Catalogs2}/>
          <Route path={"/catalogs3"} exact component={Catalogs3}/>
          {/* <Route path={'/viewdetail'} exact component={ViewDetail}/> */}
          <Route path={'/register'} exact component={Register}/>
          <Route path={'/login'} exact component={Login}/>
        </Switch>
        
      </div>
     );
  }
}
 
export default App;