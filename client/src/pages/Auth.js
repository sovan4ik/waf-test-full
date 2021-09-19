import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import moment from 'moment';
import {Container, Form, Card, Button} from "react-bootstrap";
import {login } from "../http/userAPI";
import {connect, useDispatch } from 'react-redux';
import {setCurrentTab } from '../redux/actions/locationAction';
import {setIsAuth, setUser } from '../redux/actions/userAction';
import ToastNotify from '../components/ToastNotify/ToastNotify';

const currentPageName = 'Login';

const Auth = props => {
    const dispatch = useDispatch();
    const { user, isAuth} = props;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const singIn = async () => {
        try {
            await login(email, password);
            dispatch(setUser(user));
            dispatch(setIsAuth(true));
            <Redirect to={MAIN_ROUTE} />
        } catch (e) {
            setErrorMessage(e.message)
            setShow(true);
        }

    }

    return (
        isAuth
        ? <Redirect to={MAIN_ROUTE} />
        : <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 450}} className="p-5">
                <h2 className="m-auto">Authorization</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password"
                        autoComplete="on"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Button
                        className={"mt-3"}
                        variant={"outline-success"}
                        onClick={singIn}
                    >
                        Login
                    </Button>
                </Form>
            </Card>
            <ToastNotify
            onClose={() => setShow(false)}
            show={show}
            delay={5000} 
            autohide={true}
            title={'Error'}
            date={moment().format('HH:mm:ss')}
            message={"Invalid username or password" || errorMessage}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        currentPage: state.locationReducer.currentPage,
        isAuth: state.userReducer.isAuth,
        user: state.userReducer.user
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      currentPageName: dispatch(setCurrentTab(currentPageName)),
    //   isAuth: dispatch(setIsAuth(true))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);