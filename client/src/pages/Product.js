import React, { useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { MAIN_ROUTE } from "../utils/consts";
import { getOneProduct } from "../http/productAPI";
import { setProducts, setLoaded } from '../redux/actions/productAction';
import { Container, Row, Col, Image, Card, Button, Badge, Spinner } from "react-bootstrap";

const Product = props => {
    const {isLoaded, products} = props;
    const product = products;
    const {id} = props.match.params;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        getOneProduct(id).then(data => dispatch(setProducts(data)))
        getOneProduct(id).finally(() => dispatch(setLoaded(true)))
    }, [])
    return (
        !isLoaded
        ? <Container>
            <Row
            style={{height: window.innerHeight - 54}}
            className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="secondary" />
            </Row>
        </Container>
        : product.length === 0
        ? <Redirect to={MAIN_ROUTE}/>

        :  <Container>
            <Row
        className="mt-3">
            <Col>
                <Button 
                variant="outline-light"
                size="sm"
                style={{
                    color: "#876efe",
                    borderColor: "#876efe"
                }}
                onClick={e => history.goBack()}
                >
                    {"< Back <"}
                </Button>
            </Col>
        </Row>
        <Row
        className="d-flex flex-column justify-content-md-center align-items-center">
            <Col lg={6}
            style={{position: 'relative'}}
            className="mt-3 mb-3"
            >
                <Row>
                    <Col  
                    className="d-flex justify-content-md-center" 
                    style={{
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                        padding: '12px'}}
                    >
                    <Image 
                        src={process.env.REACT_APP_API_URL + product.image}
                        fluid />
                    </Col>
                    <div style={{
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                        backdropFilter: 'saturate(180%) blur(5px)',
                        WebkitBackdropFilter: 'saturate(180%) blur(5px)'
                        }}>
                    </div>
                    <Col 
                    className="d-flex justify-content-md-center"
                    style={{zIndex: '1', padding: '12px'}}
                    >
                    <Image 
                        src={process.env.REACT_APP_API_URL + product.image}
                        fluid />
                    </Col>
                </Row>
            </Col>
            <Col lg={6}>
                <Row>
                    <Col lg={8}>
                        <h2>{product.name}</h2>
                    </Col>
                    <Col
                    lg={4}
                    className="d-flex justify-content-end">
                        <Button 
                        style={{
                            opacity: '1',
                            backgroundColor: 'rgba(0,0,0,.03)',
                            border: '1px solid rgba(0,0,0,.125)',
                            color: '#000000'
                        }}
                        disabled>
                            Price: <Badge bg="success">{product.price} $</Badge>
                        </Button>
                    </Col>
                </Row>
                <Card className="mt-3 mb-3">
                    <Card.Header>Description</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        products: state.productReducer.products,
        isLoaded: state.productReducer.isLoaded
    };
};

export default connect(mapStateToProps)(Product);