import {queryClient, router} from 'App';
import {render} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {QueryClientProvider} from '@tanstack/react-query';
import Theme from 'Components/Theme/Theme';

interface WrapperForTestsParams {
    initialRouterEntries: string[];
}

export const setupTestsWrapper = ({initialRouterEntries}: WrapperForTestsParams) => {
    const memoryRouter = createMemoryRouter(router, {
        initialEntries: initialRouterEntries,
    });
    render(
        <QueryClientProvider client={queryClient}>
            <Theme>
                <RouterProvider router={memoryRouter} />
                <ToastContainer autoClose={2000} position="top-right" theme="light" closeOnClick />
            </Theme>
        </QueryClientProvider>
    );

    return memoryRouter;
};
