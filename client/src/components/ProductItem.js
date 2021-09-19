import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";
import {Card, Col, ButtonGroup, Button} from "react-bootstrap";
import DeleteProduct from './Modals/DeleteProduct';
import EditProduct from './EditProduct';
import SimpleForm from './SimpleForm';

const ProductItem = props => {
    const [productDeleteVisible, setProductDeleteVisible] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const {isAuth, product} = props;
    const history = useHistory()
    return (
        <Col md={3} className={"mt-3"}>
            {
            isAuth && isEditMode
            // ? <SimpleForm />
            ? <EditProduct 
            setEditMode={setEditMode} 
            product={product}
            />
            : <Card style={{
                width: '100%',
                boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.07)',
                WebkitBoxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.07)',
                MozBoxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.07)'                
                }}>
            <Card.Img 
            variant="top" 
            style={{height: '150px', cursor: 'pointer', objectFit: 'cover'}} 
            src={process.env.REACT_APP_API_URL + product.image} 
            onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.price + "$"}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                {
                isAuth
                ? <ButtonGroup className="d-flex" aria-label="Controls">
                    <DeleteProduct show={productDeleteVisible} product={product} onHide={() => setProductDeleteVisible(false)}/>
                        <Button 
                        variant="primary"
                        onClick={() => setEditMode(true)}
                        >Edit
                        </Button>
                        <Button 
                        variant="danger"
                        onClick={() => setProductDeleteVisible(true)}
                        >
                            Delete
                        </Button>
                    </ButtonGroup> 
                : null
                }
            </Card.Body>
        </Card>
            }
        </Col>
    );
};

const mapStateToProps = state => {
    return {
        products: state.productReducer.products,
        isAuth: state.userReducer.isAuth
    };
  };

export default connect(mapStateToProps)(ProductItem);