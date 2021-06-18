import React from 'react';
import {Link} from 'react-router-dom';
//Redux 
import {useDispatch} from 'react-redux';
import {deleteProductAction} from '../actions/productActions';
import Swal from 'sweetalert2';

const Product = ({product}) => {
    const {id, name, price} = product;

    const dispatch = useDispatch();

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

    return ( 
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold">${price}</span></td>
            <td className="acciones">
                <Link to={`/products/edit/${id}`} className="btn btn-primary mr-2">
                    Edit
                </Link>
                <button onClick={() => deleteConfirm(id)} type="button" className="btn btn-danger">Delete</button>
            </td>
        </tr>
     );
}
 
export default Product;