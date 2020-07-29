import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Connectors from './redux/Connectors';



const Div = document.getElementById("app")

Div ? ReactDOM.render(<Provider store={Connectors.store}><Connectors.App /></Provider>, Div) : console.log("nothin");