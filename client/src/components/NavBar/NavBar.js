import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { MAIN_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { setIsAuth, setUser } from '../../redux/actions/userAction';
import CreateProduct from '../Modals/CreateProduct';

const NavBar = props => {
    const [productVisible, setProductVisible] = useState(false)
    const dispatch = useDispatch();
    const { isAuth } = props;
    const logout = () => {
        dispatch(setIsAuth(false));
        dispatch(setUser({}));
        localStorage.removeItem('token')
    }
    return (
        <Navbar style={{backgroundColor: '#876efe'}} variant="dark">
            <Container style={{flexWrap: 'wrap'}}>
                <Navbar.Brand>#ShopName</Navbar.Brand>
                <Nav className="me-auto">
                <NavLink style={{color: '#fff', textDecoration: 'none', marginRight: '1rem'}} to={MAIN_ROUTE}>Home</NavLink>
                {isAuth
                ? <NavLink style={{color: '#fff', textDecoration: 'none'}} to={MAIN_ROUTE} onClick={logout} exact>Logout</NavLink> 
                : <NavLink style={{color: '#fff', textDecoration: 'none'}} to={LOGIN_ROUTE} exact>Login</NavLink> 
                }
                </Nav>
                <Nav>
                {isAuth
                ? <NavLink style={{color: '#fff', textDecoration: 'none'}} to="?" onClick={() => setProductVisible(true)} exact>Add new product</NavLink> 
                : null
                }
                </Nav>
                <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            </Container>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.userReducer.isAuth,
        user: state.userReducer.user
    };
};
export default connect(mapStateToProps)(NavBar);