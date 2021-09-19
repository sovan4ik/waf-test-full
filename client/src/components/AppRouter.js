import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import {publicRoutes} from "../routes";
import { setIsAuth, setUser } from '../redux/actions/userAction';
import {MAIN_ROUTE} from "../utils/consts";
import { check } from "../http/userAPI";

const AppRouter = props => {
    const dispatch = useDispatch();
    useEffect(() => {
      check().then(data => {
          dispatch(setIsAuth(true))
          dispatch(setUser(true))
      })
    }, [])

    return (
        <Switch>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.userReducer.isAuth,
        user: state.userReducer.user
    };
};
  
  
export default connect(mapStateToProps)(AppRouter);