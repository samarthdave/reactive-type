import ReactDOM from 'react-dom';
import createRoutes from './routes';

import * as serviceWorker from './serviceWorker';

import './style/index.css';

const rootElement = document.getElementById('root');
const routes = createRoutes();

ReactDOM.render(routes, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();