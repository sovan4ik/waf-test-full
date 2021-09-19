import {MAIN_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE} from "./utils/consts";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import Product from "./pages/Product";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: Product
    },
]