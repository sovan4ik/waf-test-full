import React, {useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Card, ButtonGroup, Button, Form, Alert} from "react-bootstrap";
import {updateProduct, getProducts} from '../http/productAPI';

const ProductItem = props => {
    const {product, setEditMode} = props;
    const {id, name, price, description} = product;
    const image = process.env.REACT_APP_API_URL + product.image;
    const [nameNew, setName] = useState(null)
    const [priceNew, setPrice] = useState(null)
    const [descriptionNew, setDescription] = useState(null)
    const [imageNew, setImage] = useState(null)
    const [imagePreviewNew, setNewPreview] = useState(null)

    const [errorMessage, setErrorMessage] = useState('')
    const [isSending, setIsSending] = useState(false)

    const history = useHistory();

    const onChangePrice = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            return setPrice(Number(e.target.value))
        }
    }

    const onChangeImage = e => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                setImage(file)
                setNewPreview(event.target.result)
                };
            reader.readAsDataURL(file);
        } else {
            setImage(null)
            setNewPreview(null)   
        }
    }

    const isNewData = () => {
        if (imageNew !== null && imageNew !== image) {
            return false;
        }
        if (nameNew !== null && nameNew !== name) {
            return false;
        }
        if (priceNew !== null && priceNew !== price) {
            return false;
        }
        if (descriptionNew !== null && descriptionNew !== description) {
            return false;
        }
        return true;
    }

    const updateProductData = () => {
        setIsSending(true);
        setErrorMessage('');
        const formData = new FormData()
        if (nameNew !== null && nameNew !== name) {
            formData.append('name', nameNew)
        }
        if (priceNew !== null && priceNew !== price) {
            formData.append('price', priceNew)
        }
        if (descriptionNew !== null && descriptionNew !== description) {
            formData.append('description', descriptionNew)
        }
        if (imageNew !== null && imageNew !== image) {
            formData.append('image', imageNew)
        }
        updateProduct(id, formData)
        .then(() => history.go(0))
        .catch(() => setErrorMessage('Fill in all the fields'))
        .finally(() => setIsSending(false))
    }

    const onChangeName = e => {
        setErrorMessage('');
        setName(e.target.value);
        setTimeout(() => {
            if (name !== e.target.value) {
                getProducts()
                .then(data => {
                    const arr = [];
                    data.map(e => arr.push(e.name))
                    const results = arr.filter(word => word === e.target.value);
                    if (results.length) {
                        setErrorMessage('A product name already exists')
                    }
                })
            }
        }, 200);
    }
    return (
        <Form>
        <Card style={{
            width: '100%',
            boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.07)',
            WebkitBoxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.07)',
            MozBoxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.07)'
        }}>
        <Form.Group
        controlId="editForm.ControlInput1"
        >
            <Form.Label
            style={{width: '100%'}}
            >
                <Card.Img 
                variant="top" 
                style={{height: '150px', cursor: 'pointer', objectFit: 'cover'}} 
                src={imagePreviewNew !== null ? imagePreviewNew : image}
                />
            </Form.Label>
        </Form.Group>
        <Card.Body>
            <Form.Group 
            className="mb-3"
            controlId="editForm.ControlInput1"
            >
                <Form.Control 
                required
                type="file"
                onChange={onChangeImage}
                />
            </Form.Group>
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
            controlId="editForm.ControlInput2"
            >
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                required
                value={nameNew !== null ? nameNew : name}
                onChange={onChangeName}
                placeholder="Enter name of product"  
                />
            </Form.Group>
            <Form.Group
            className="mb-3"
            controlId="editForm.ControlInput3"
            >
                <Form.Label>Price ($):</Form.Label>
                <Form.Control 
                required
                value={priceNew !== null ? priceNew : price}
                onChange={onChangePrice}
                placeholder="Enter price of product" 
                />
            </Form.Group>
            <Form.Group
            className="mb-3"
            controlId="editForm.ControlInput4"
            >
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                required
                as="textarea"
                value={descriptionNew !== null ? descriptionNew : description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter description of product" 
                rows={3}
                />
            </Form.Group>
            <ButtonGroup className="d-flex" aria-label="Controls">
                    <Button 
                    variant="success"
                    onClick={updateProductData}
                    disabled={isNewData() || errorMessage !== ''}
                    >
                        {isSending ? 'Updating...' : 'Update'}
                    </Button>
                    <Button 
                    variant="secondary"
                    onClick={() => setEditMode(false)}
                    >
                        Cancel
                    </Button>
            </ButtonGroup> 
        </Card.Body>
        </Card>
        </Form>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.userReducer.isAuth,
        products: state.productReducer.products
    };
  };

export default connect(mapStateToProps)(ProductItem);