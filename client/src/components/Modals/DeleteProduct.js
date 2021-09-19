import React from 'react';
import {useHistory} from 'react-router-dom';
import {Modal, Button} from "react-bootstrap";
import {deleteProduct} from '../../http/productAPI';

const DeleteProduct = props => {
    const history = useHistory();
    const deleteProductConfirm = id => {
        deleteProduct(id)
        .then(() => history.go(0))
        .catch(e => console.log(e))
    }
    const {product} = props;
    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you are deleting the "{product.name}, {product.price}$" item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onHide(true)}>
            Cancel, it's mistake 😲
          </Button>
          <Button variant="danger" onClick={() => deleteProductConfirm(product.id)}>
            Delete, it's true 😌
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default DeleteProduct;