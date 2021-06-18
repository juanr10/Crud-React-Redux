import axiosClient from '../config/axios';
import Swal from 'sweetalert2';
import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_PRODUCTS_DOWNLOAD,
    PRODUCTS_DOWNLOAD_SUCCESS,
    PRODUCTS_DOWNLOAD_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR
} from '../types';


/**
 * @name: getProductsAction.
 * @description: download products from the database.
 * @param: none.
 * @return: none.
*/
export function getProductsAction() {
    return async (dispatch) => {
        dispatch(productsDownload());

        try {
            const products = await axiosClient.get('/products');
            dispatch(productsDownloadSuccess(products.data));

        } catch (error) {
            console.log(error);
            dispatch(productsDownloadError(true));
        }
    }
}

/**
 * @name: addNewProductAction.
 * @description: Add a new product to the database.
 * @param: product to add.
 * @return: none.
*/
export function addNewProductAction(product){
    return async (dispatch) => {
        dispatch(addProduct());

        try {
            await axiosClient.post('/products', product);
            dispatch(addProductSuccess(product));

            //SweetAlert2
            Swal.fire(
                'Success.',
                'The product has been added successfully.',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(addProductError(true));

            //SweetAlert2
            Swal.fire(
                'Error.',
                'There is an unexpected error on the server.',
                'error'
            );
        }
    }
}

/**
 * @name: deleteProductAction.
 * @description: Delete a product from the database.
 * @param: product id to delete.
 * @return: none.
*/
export function deleteProductAction(id){
    return async (dispatch) => {
        dispatch(deleteProduct(id));

        try {
            await axiosClient.delete(`/products/${id}`);
            dispatch(deleteProductSuccess());

            Swal.fire(
                'Success.',
                'The product has been deleted successfully.',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(deleteProductError(true));

            Swal.fire(
                'Error.',
                'There is an unexpected error on the server.',
                'error'
            );
        }
    }
}

/**
 * @name: downloadProducts.
 * @description: Sets the global state 'loading' to true until the products are downloaded.
 * @param: none.
 * @return: none.
*/
const productsDownload = () => ({
    type: START_PRODUCTS_DOWNLOAD,
    payload: true
});

/**
 * @name: productsDownloadSuccess.
 * @description: Set the downloaded products to the global state 'products'.
 * @param: products to load.
 * @return: none.
*/
const productsDownloadSuccess = products => ({
    type: PRODUCTS_DOWNLOAD_SUCCESS,
    payload: products
});

/**
 * @name: productsDownloadError.
 * @description: Passes a boolean variable to indicate that there has been an error in @getProductsAction setting the global state 'error' to true.
 * @param: error.
 * @return: none.
*/
const productsDownloadError = error => ({
    type: PRODUCTS_DOWNLOAD_ERROR,
    payload: error
});

/**
 * @name: addProduct.
 * @description: Sets the global state 'loading' to true until a new product is added.
 * @param: none.
 * @return: none.
*/
const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
});

/**
 * @name: addProductSuccess.
 * @description: Add the added product to the global state 'products'.
 * @param: product added.
 * @return: none.
*/
const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

/**
 * @name: addProductError.
 * @description: Passes a boolean variable to indicate that there has been an error in @addNewProductAction setting the global state 'error' to true.
 * @param: error.
 * @return: none.
*/
const addProductError = error => ({
    type: ADD_PRODUCT_ERROR,
    payload: error
});

/**
 * @name: deleteProduct.
 * @description: Add to the global state 'productToDelete' the product that will be deleted.
 * @param: product id to delete.
 * @return: none.
*/
const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: id
});

/**
 * @name: deleteProductSuccess.
 * @description: When a product is successfully deleted, it is also deleted from the global state 'products'.
 * @param: product added.
 * @return: none.
*/
const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS
});

/**
 * @name: deleteProductError.
 * @description: Passes a boolean variable to indicate that there has been an error in @deleteProductAction setting the global state 'error' to true.
 * @param: error.
 * @return: none.
*/
const deleteProductError = error => ({
    type: DELETE_PRODUCT_ERROR,
    payload: error
});