import { useEffect, useState } from "react";
import StoreData from "../Data/service";
import { useAppDispatch, useAppSelector } from "../Services/custom-hooks";
import { productAction } from "../Services/product-reducers";
import { productState } from "../Services/store";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";

const Products = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getData = async () =>
            StoreData.getPosts().then((data) => {
                dispatch(productAction.getProducts(data));
                setLoading(false);
                // console.log(data)
            });

        try {
            getData();
        } catch (error) {
            setLoading(true);
            throw new Error("Failed to get the data");
        }
    }, [dispatch]);
    const newData = useAppSelector(productState);

    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 ">
                    {loading ? (
                        <Spinner />
                    ) : (
                        newData.map((item, index) => (
                            <ProductCard key={index} {...item} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Products;
