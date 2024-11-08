import './ItemListContainer.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '../../services/ProductsServices'
import Spinner from '../Spinner/Spinner'
import ItemList from '../ItemList/ItemList'

function ItemListContainer() {
    const [h1, setH1] = useState('Bienvenidos a Kyo Sushi');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id: category } = useParams();

    const fetchItems = async () => {
        try {
            const data = await getProducts();
            setItems(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchItemsByCategory = async () => {
        try {
            const data = await getProductsByCategory(category);
            setItems(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (category) {
            setLoading(true);
            fetchItemsByCategory();
            setH1(`${category}`);
        } else {
            setLoading(true);
            fetchItems();
            setH1('Bienvenidos a Kyo Sushi');
        }
    }, [category]);

    return (
        <>
            <h1>{h1}</h1>

            {loading && <Spinner />}

            {!loading && items.length > 0 && <ItemList items={items} />}

            {!loading && items.length === 0 && <p>No hay productos disponibles</p>}
        </>
    );
}

export default ItemListContainer