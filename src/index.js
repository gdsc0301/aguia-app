import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import Index from './Home';
import reportWebVitals from './reportWebVitals';
import "@fontsource/roboto";

import Header from "./parts/Header";
import { Typography } from '@material-ui/core';
const url = window.location.pathname.slice(-1) === "/" ? window.location.pathname : window.location.pathname +"/";
const filePath = `.${url}index.js`;

var Page = undefined;
import(filePath+"").then(obj => {
    console.log(typeof obj, obj);
    Page = obj.default;
    load();
}).catch((obj)=>{
    console.log(typeof obj, obj);
    Page = Index;
    load();
});

function load() {
    ReactDOM.render(
        <React.StrictMode>
            <Header />
            <Typography variant="h6">The Path: {filePath}</Typography>
            <Page />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
