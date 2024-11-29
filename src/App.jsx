import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import 'normalize.css';

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <NavBar />

                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/tienda/" element={<ItemListContainer />} />
                    <Route path="/tienda/:category" element={<ItemListContainer />} />
                    <Route path="/item/:id" element={<ItemDetailContainer />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<LandingPage />} />
                </Routes>

                <Footer />
            </CartProvider>
        </BrowserRouter>
    );
};

export default App;