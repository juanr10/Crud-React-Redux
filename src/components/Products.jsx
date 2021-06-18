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

    }, []);

    //Products state access
    const products = useSelector(state => state.products.products);
    const error = useSelector(state => state.products.error);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Products list</h2>

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? 'No hay productos' : (
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