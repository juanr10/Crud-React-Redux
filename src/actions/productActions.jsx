import axiosClient from '../config/axios';
import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR
} from '../types';

//Add new products
export function addNewProductAction(product){
    return async (dispatch) => {
        dispatch(addProduct());

        try {
            await axiosClient.post('/products', product);
            dispatch(addProductSuccess(product));
        } catch (error) {
            console.log(error);
            dispatch(addProductError(true));
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
});

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

const addProductError = error => ({
    type: ADD_PRODUCT_ERROR,
    payload: error
})