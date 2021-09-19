import React, { useEffect } from 'react';
import { Container, Row, Spinner } from "react-bootstrap";
import { connect, useDispatch } from 'react-redux';
import { getProducts } from "../http/productAPI";
import { setCurrentTab } from '../redux/actions/locationAction';
import { setProducts, setLoaded } from '../redux/actions/productAction';
import ProductList from '../components/ProductList';


const currentPageName = 'Main';

const Main = props => {
    const {isLoaded} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts().then(data => dispatch(setProducts(data)))
        getProducts().finally(() => dispatch(setLoaded(true)))
    }, [])

    return (
        <Container>
            {
            isLoaded
            ? <ProductList />
            : <Row
            style={{height: window.innerHeight - 54}}
            className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="secondary" />
            </Row>
            }
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        currentPage: state.locationReducer.currentPage,
        products: state.productReducer.products,
        isAuth: state.userReducer.isAuth,
        isLoaded: state.productReducer.isLoaded
    };
  };
  
  const mapDispatchToProps = dispatch => {
      return {
        currentPageName: dispatch(setCurrentTab(currentPageName))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Main);