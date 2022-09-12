import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Component/Header";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import ProductDetail from "./Pages/ProductDetail";
import NOtFound from "./Pages/NOtFound";
import ProductContext from "./Context/product-data";
import ErrorBoundary from "./Component/ErrorBoundary";
import StoreData, { storeDatatype } from "./Data/service";

const App = () => {
    const [itemData, setItemData] = useState<storeDatatype[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        StoreData.getPosts().then((data) => {
            setItemData(data);
            setLoading(false)
            // console.log(data)
        });
    }, []);

    const [cartItems, setCartItems] = useState(0);
    const setCart = (cartItems: number) => {
        setCartItems(cartItems);
    };

    const [getData, setGetData] = useState<storeDatatype[]>([...itemData]);
    const setData = (obj: storeDatatype[]) => {
        let updatedData = [...getData, ...obj];
        setGetData(updatedData);
    }; // not required while posting the data since we are getting data from api

    const handleRemove = (id: number) => {
        setItemData((prevData) => {
            return prevData.filter((item) => item.id !== id);
        });
    };

    return (
        <ProductContext.Provider value={{ onload:loading, bigdata: itemData, cartData: cartItems, onRemoveHandler: handleRemove, updatedData: setData, setcart: setCart }}>
            <ErrorBoundary>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/admin">
                        <Admin />
                    </Route>
                    <Route exact path="/shop">
                        <Shop />
                    </Route>

                    <Route exact path="/cart">
                        <Cart />
                    </Route>
                    <Route exact path="/wishlist">
                        <Wishlist />
                    </Route>
                    <Route exact path="/shop/:productId">
                        <ProductDetail />
                    </Route>
                    <Route exact path="*">
                        <NOtFound />
                    </Route>
                </Switch>
            </ErrorBoundary>
        </ProductContext.Provider>
    );
};

export default App;
