import React, {Fragment, useEffect} from 'react';
//Redux 
import {useDispatch, useSelector} from 'react-redux';
import {getProductsAction} from '../actions/productActions';

import Product from './Product';

const Products = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = () => dispatch(getProductsAction());
        loadProducts();
        //eslint-disable-next-line
    }, []);

    //Products state access
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Products list</h2>

            {error ? <p className="alert alert-danger p-2 mt-4 text-center mt-4">There is an unexpected error loading products. Please try again later.</p> : null}
            {loading ? <p className="text-center">Loading...</p> : null}

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? <tr><td>No hay productos</td></tr> : (
                        products.map(product => (
                            <Product 
                                key={product.id}
                                product={product}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Products;