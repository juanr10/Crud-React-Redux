import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR
} from '../types';

//Add new products
export function addNewProductAction(product){
    return () => {
        console.log(product);
    }
}