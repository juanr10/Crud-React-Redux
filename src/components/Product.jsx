import React from 'react';
import {useHistory} from 'react-router-dom';
//Redux 
import {useDispatch} from 'react-redux';
import {deleteProductAction, getProductToEditAction} from '../actions/productActions';
import Swal from 'sweetalert2';

const Product = ({product}) => {
    const {id, name, price} = product;
    const dispatch = useDispatch();
    const history = useHistory();

    /**
     * @name: deleteConfirm.
     * @description: Asks to the user for delete confirmation and call action @deleteProductAction from productActions passing a product id.
     * @param: product id to delete.
     * @return: none.
    */
    const deleteConfirm = id => {
        //Asks user confirmation
        Swal.fire({
            title: 'Are you sure you want to delete this product?',
            text: "This action will be irreversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#78c2ad',
            cancelButtonColor: '#ff7851',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if(result.value) {
                dispatch(deleteProductAction(id));
            }
        });
    }

    /**
     * @name: editRedirection.
     * @description: Get the product to edit adding it to the global state 'productToEdit' and redirects to edit view.
     * @param: product to edit.
     * @return: none.
    */
    const editRedirection = product => {
        dispatch(getProductToEditAction(product));
        history.push(`/products/edit/${product.id}`);
    }

    return ( 
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold">${price}</span></td>
            <td className="acciones">
                <button type="button" onClick={() => editRedirection(product)} className="btn btn-primary mr-2">
                    Edit
                </button>
                <button onClick={() => deleteConfirm(id)} type="button" className="btn btn-danger">
                    Delete
                </button>
            </td>
        </tr>
     );
}
 
export default Product;