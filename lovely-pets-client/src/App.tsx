import './index.css';
import {Layout} from 'Components/Layout/Layout';
import {Catalog} from 'Pages/Catalog/Catalog';
import {Favourites} from 'Pages/Favourites/Favourites';
import {PageNotFound} from 'Pages/PageNotFound/PageNotFound';
import {PetCard} from 'Pages/PetCard/PetCard';
import {Profile} from 'Pages/Profile/Profile';
import {RouterProvider, createBrowserRouter, RouteObject} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SignUp} from 'Pages/SignUp/SignUp';
import {SignIn} from 'Pages/SignIn/SignIn';
import {Cart} from 'Pages/Cart/Cart';
import {AddReview} from 'Pages/AddReview/AddReview';
import {AddProduct} from 'Pages/AddProduct/AddProduct';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {withTranslation} from 'react-i18next';
import {useEffect} from 'react';
import {setCartFromStorage, setCartToStorage} from 'Store/cartStore';
import 'Style/Themes.module.css';
import Theme from 'Components/Theme/Theme';

export const router: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <div />, // TODO: добавить errorBoundary, пока заглушка
        children: [
            {
                path: '/',
                element: <Catalog />,
            },
            {
                path: '/favourites',
                element: <Favourites />,
            },
            {
                path: '/pets/:petId',
                element: <PetCard />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/addReview',
                element: <AddReview />,
            },
            {
                path: '/addPet',
                element: <AddProduct />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/signin',
                element: <SignIn />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
];

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const App = () => {
    useEffect(() => {
        window.addEventListener('load', setCartFromStorage);
        window.addEventListener('beforeunload', setCartToStorage);
        return () => {
            window.removeEventListener('load', setCartFromStorage);
            window.removeEventListener('beforeunload', setCartToStorage);
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Theme>
                <RouterProvider router={createBrowserRouter(router)} />
                <ToastContainer autoClose={2000} position="top-right" theme="light" closeOnClick />
            </Theme>
        </QueryClientProvider>
    );
};

export default withTranslation()(App);
