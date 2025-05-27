import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-loading-skeleton/dist/skeleton.css';
import "react-image-gallery/styles/css/image-gallery.css";
import {BrowserRouter as Router} from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import CartContext from './Context/CartContext';
import SearchContext from './Context/SearchContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
    <MenuContext>
      <SearchContext>
      <CartContext>
    <Router>
<App />
</Router>
</CartContext>
</SearchContext>
    </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
