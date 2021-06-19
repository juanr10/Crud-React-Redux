import React, {useState} from 'react';
//Redux 
import {useDispatch, useSelector} from 'react-redux';
import {addNewProductAction} from '../actions/productActions';
import {showAlertAction, hideAlertAction} from '../actions/alertActions';

const NewProduct = ({history}) => {
    //State component
    const [name, saveName] = useState('');
    const [price, savePrice] = useState(0);
    //Using dispatch to create a function
    const dispatch = useDispatch();

    //Products state access
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const alert = useSelector(state => state.alert.alert);

    /**
     * @name: addProduct.
     * @description: Call action @addNewProductAction from productActions passing a product.
     * @param: product to add.
     * @return: none.
    */
    const addProduct = (product) => dispatch(addNewProductAction(product));

    /**
     * @name: submit.
     * @description: Validates that the data entered are correct and if so, calls the method @addProduct.
     * @param: none.
     * @return: none.
    */
    const submit = e => {
        e.preventDefault();
        
        //Validate
        if(name.trim() === '' || price <= 0) {
            const alert = {
                msg: 'Both fields are required',
                classes: 'alert alert-danger text-center text-uppercase p-3'
            }
            
            dispatch(showAlertAction(alert));

            return;
        }

        //No errors
        dispatch(hideAlertAction());

        //Add product
        addProduct({
            name,
            price
        });

        //Home redirection
        history.push('/');
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add New Product
                        </h2>

                        {alert ? <p className={alert.classes}>{alert.msg}</p> : null}

                        <form onSubmit={submit}>
                            <div className="form-group">
                                <label htmlFor="">Product Name</label>
                                <input type="text" className="form-control" placeholder="Product Name" name="name" value={name} onChange={e => saveName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Product Price</label>
                                <input type="number" className="form-control" placeholder="Product Price" name="price" value={price} onChange={e => savePrice(Number.parseFloat(e.target.value))}/>
                            </div>
                            <button type="submit" className="btn btn-primary font-weight-bold d-block w-100">Add</button>
                        </form>

                        {/* TODO -> ADD SPINNER*/}
                        {loading ? <p>Loading...</p> : null}
                        {error ? <p className="alert alert-danger p-2 mt-4 text-center">There is an unexpected error. Please try again later.</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NewProduct;