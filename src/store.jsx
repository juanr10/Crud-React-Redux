import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

/**
 * @name: addProduct.
 * @description: Call action @addNewProductAction from productActions passing a product.
 * @param: product to add.
 * @return: none.
*/
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk), 
        typeof window === 'object' && // Redux Devtools
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? 
                window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;