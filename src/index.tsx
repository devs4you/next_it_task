import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Buildings from './Buildings';
import Footer from './Footer';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createTheme({
	overrides: {
		MuiButton: {
			root: {
				// fix for safari
				transition: 'color .01s',
			},
		},
	}
});
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<div className="wrapper">
					<Switch>
						<Switch>
							<Route exact path="/" component={App} />
							<Route exact path="/buildings" component={Buildings} />
						</Switch>
					</Switch>
					<Footer />
				</div>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
