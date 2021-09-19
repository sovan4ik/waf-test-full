import React, {useState} from 'react';
import {Modal, Button, Form, Badge, Alert} from "react-bootstrap";
import {createProduct} from "../../http/productAPI";
import { useHistory } from 'react-router-dom';

const CreateProduct = props => {
    const [errorMessage, setErrorMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)

    const history = useHistory();

    const addProduct = () => {
        setIsSending(true);
        setErrorMessage('');
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('image', image)
        createProduct(formData)
        .then(() => history.go(0))
        .catch(() => setErrorMessage('Fill in all the fields, or such a product name already exists'))
        .finally(() => setIsSending(false))
    }

    const onChangePrice = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            setPrice(e.target.value)
        }
    }
    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add new product
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {
                errorMessage !== ''
                ? <Alert
                variant="danger"
                >
                    {errorMessage}
                </Alert>
                : null
                }
                <Form.Group
                className="mb-3"
                controlId="createForm.ControlInput1"
                >
                    <Form.Label>Name of product* 
                        <Badge pill bg="danger">
                            unique value
                        </Badge></Form.Label>
                    <Form.Control
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter name of product" 
                    />
                </Form.Group>
                <Form.Group 
                className="mb-3"
                controlId="createForm.ControlInput2"
                >
                    <Form.Label>Price of product ($)</Form.Label>
                    <Form.Control 
                    required
                    value={price}
                    onChange={onChangePrice}
                    placeholder="Enter price of product" 
                    />
                </Form.Group>
                <Form.Group 
                className="mb-3" 
                controlId="createForm.ControlInput3"
                >
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    required
                    as="textarea"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter description of product" 
                    rows={3}
                    />
                </Form.Group>
                <Form.Group 
                className="mb-3"
                controlId="createForm.ControlInput4"
                >
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                    required
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                    />
                </Form.Group>
                <Button 
                variant="primary" 
                onClick={addProduct}
                disabled={name && price && description && image ? false : true}
                >
                    {isSending ? 'Sending...' : 'Create new product'}
                </Button>
            </Form>
      </Modal.Body>
    </Modal>
    );
};

export default CreateProduct;