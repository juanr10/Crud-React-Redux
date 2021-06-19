import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

//Redux 
import {useDispatch, useSelector} from 'react-redux';
import {editProductAction} from '../actions/productActions';

const EditProduct = () => {
    //State component
    const [product, saveProduct] = useState({
        id: '',
        name: '', 
        price: ''
    });
    const dispatch = useDispatch();
    const history = useHistory();

    //Products state access
    const productToEdit = useSelector(state => state.products.productToEdit);

    useEffect(() => {
        saveProduct(productToEdit);
    }, [productToEdit]);

    /**
     * @name: onChangeForm.
     * @description: Reads and fill component state with form data.
     * @param: event.
     * @return: none.
    */
    const onChangeForm = e => {
        let value = e.target.value;

        if (e.target.name == 'price') {
            value = Number.parseFloat(e.target.value)
        }

        saveProduct({
            ...product,
            [e.target.name] : value
        });
    };

    /**
     * @name: submit.
     * @description: Validates that the data entered are correct and if so, calls the method @editProductAction from productActions.jsx.
     * @param: event.
     * @return: none.
    */
    const submit = e => {
        e.preventDefault();

        dispatch(editProductAction(product));

        //Home redirection
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Update Product
                        </h2>

                        <form onSubmit={submit}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" className="form-control" placeholder="Product Name" name="name" value={product.name} onChange={onChangeForm}/>
                            </div>
                            <div className="form-group">
                                <label>Product Price</label>
                                <input type="number" className="form-control" placeholder="Product Price" name="price" value={product.price} onChange={onChangeForm}/>
                            </div>
                            <button type="submit" className="btn btn-primary font-weight-bold d-block w-100">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditProduct;