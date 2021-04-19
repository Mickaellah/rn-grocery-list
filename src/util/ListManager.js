import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values'
import {v4 as uuid } from 'uuid';

const updateStoredCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
}

const updateStoredCurrentCart = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(list));
}

const updateStoredCurrentFavorite = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentFavorite', JSON.stringify(list));
}

export const useCurrentList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite] = useState([]);

    const addItem = (text) => {
        const newList = [{id: uuid(), name: text}, ...list];
        setList(newList);
        updateStoredCurrentList(newList);
    }

    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id);
        setList(newList);
        updateStoredCurrentList(newList);
    }

    const addToCart = (item) => {
        removeItem(item.id);
        const newCart = [item, ...cart];
        setCart(newCart);
        updateStoredCurrentCart(newCart);
    }

    const addToFavorite = (item) => {
        // removeItem(item.id);
        // console.log(favorite);
        const newFavorite = [item, ...favorite]
        setFavorite(newFavorite);
        updateStoredCurrentFavorite(newFavorite);
    }

    useEffect(() => {
        Promise.all([
            AsyncStorage.getItem('@@GroceryList/currentList'),
            AsyncStorage.getItem('@@GroceryList/currentCart'),
            AsyncStorage.getItem('@@GroceryList/currentFavorite'),
        ])
            .then(([list, cartItems, favoritedItems]) => [JSON.parse(list), JSON.parse(cartItems), JSON.parse(favoritedItems)])
            .then(([list, cartItems, favoritedItems]) => {
                if (list) {
                    setList(list);
                }
                if (cartItems) {
                    setCart(cartItems);
                }
                if (favoritedItems) {
                    setFavorite(favoritedItems);
                }
                setLoading(false);
            })
    }, []);

    return {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favorite,
        addToFavorite,
        updateStoredCurrentList,
    }
}