import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import * as registerServiceWorker from './registerServiceWorker';


localStorage.token = "hola";
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker.unregister();
