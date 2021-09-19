import React from 'react';
import {Row, Alert} from "react-bootstrap";
import ProductItem from "./ProductItem";
import {connect} from 'react-redux';

const ProductList = props => {
    const { products } = props;
    return (
        products.length
        ? <Row>
            {products.map(product =>
                <ProductItem 
                key={product.id}
                product={product}
                />
            )}
            </Row>
        : <Row 
        style={{height: window.innerHeight - 54}}
        className="d-flex justify-content-center align-items-center">
            <Alert 
            variant="danger"
            style={{width: "auto"}}
            className="ps-5 pe-5">
                <Alert.Heading>Error</Alert.Heading>
                <p>No data in database</p>
            </Alert>
        </Row>
    );
};

const mapStateToProps = state => {
    return {
        products: state.productReducer.products
    };
  };

export default connect(mapStateToProps)(ProductList);