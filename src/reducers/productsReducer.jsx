import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_PRODUCTS_DOWNLOAD,
    PRODUCTS_DOWNLOAD_SUCCESS,
    PRODUCTS_DOWNLOAD_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../types';

//Each reducer has his own state
const initialState = {
    products: [],
    error: false,
    loading: false,
    productToDelete: null,
    productToEdit: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case START_PRODUCTS_DOWNLOAD:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: [...state.products, action.payload]
            }   
        case PRODUCTS_DOWNLOAD_ERROR: 
        case ADD_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCTS_DOWNLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                productToDelete: action.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => product.id !== state.productToDelete),
                productToDelete: null
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                productToEdit: action.payload
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.map(product => 
                    product.id === action.payload.id ? product = action.payload : product
                ),
                productToEdit: null
            }
        default: 
            return state;
    }
};