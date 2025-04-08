import '@testing-library/jest-dom';
import {setupTestsWrapper} from 'Utils/setupTestWrapper';
import {render, screen} from '@testing-library/react';
import {AddReview} from 'Pages/AddReview/AddReview';
import {BrowserRouter, createMemoryRouter} from 'react-router-dom';
import * as ReactRouter from 'react-router';
import {ETestId} from 'Enum';
import {userEvent} from '@testing-library/user-event';
import {queryClient} from 'App';
import {QueryClientProvider} from '@tanstack/react-query';

describe('Тесты для компонента AddReview', () => {
    let router: ReturnType<typeof createMemoryRouter> | undefined;
    let submitBtn: HTMLButtonElement | undefined;
    let textInput: HTMLInputElement | undefined;
    const name = 'productName';
    const productId = '123';

    beforeEach(() => {
        jest.spyOn(ReactRouter, 'useLocation').mockImplementation(() => ({
            state: {name, _id: productId},
            pathname: '',
            hash: '',
            key: '',
            search: '',
        }));
        router = setupTestsWrapper({initialRouterEntries: ['/addReview']});
        submitBtn = screen.getByTestId(ETestId.ADD_REVIEW_SUBMIT_BUTTON);
        textInput = screen.getByTestId(ETestId.ADD_REVIEW_TEXT_INPUT);
    });

    describe('Проверяем элементы компонента AddReview', () => {
        test('Проверяем что поле текстового сообщения и кнопка добавления отзыва доступны', async () => {
            expect(submitBtn).toBeEnabled();
            expect(textInput).toBeEnabled();
        });
        test('Проверяем что запрос не выполняется при незаполненных поле текстового сообщения и редиректа не происходит', async () => {
            expect(textInput).toHaveDisplayValue('');

            await userEvent.click(submitBtn);
            expect(router?.state.location.pathname).toEqual('/addReview');
        });
    });

    describe('Снапшот компонента AddReview', () => {
        test('Snapshot', () => {
            const {asFragment} = render(
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <AddReview />
                    </BrowserRouter>
                </QueryClientProvider>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
