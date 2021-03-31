import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import './components/TodoApp.css';
import {AddEnlace} from './components/AddEnlace';
import {Login} from './components/Login';
import {BrowserRouter as Link, Route, Switch, BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({forceRefresh:true});

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn !== undefined 
          ? <Component {...props} />
          : <Redirect to='/login' />
    )} />
)

const PrivateRoute2 = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn === undefined 
          ? <Component {...props} />
          : <Redirect to='/addEnlace' />
    )} />
)




export class App extends Component {
	constructor(props) {
        super(props);
        if ((localStorage.token !== undefined) && (localStorage.token !== "undefined")){
            this.state = { token : localStorage.token };
        }
        else{
            this.state = { token : undefined };
        }
		this.handleTokenChange = this.handleTokenChange.bind(this);
		this.AddEnlaceView = () => (<AddEnlace />);
		this.LoginView = () => (<Login />);
    }
	
    render() {
        return (
            <BrowserRouter history={history}>
                <Switch>
                <Redirect exact from='/' to='/login' />
				<PrivateRoute2 path={"/login"} isLoggedIn={this.state.token} component={this.LoginView}/>
				<PrivateRoute path={"/addEnlace"} isLoggedIn={this.state.token} component={this.AddEnlaceView}/>
				</Switch>
            </BrowserRouter>
		);
	}
	handleTokenChange(e){
        this.setState({ 
			token  : localStorage.token
        }); 
	}
}



