import '@testing-library/jest-dom';
import {setupTestsWrapper} from 'Utils/setupTestWrapper';
import {getByTestId, render, screen} from '@testing-library/react';
import {ETestId} from 'Enum';
import {Footer} from 'Components/Footer/Footer';
import {queryClient} from 'App';
import {QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter} from 'react-router-dom';
import Theme from 'Components/Theme/Theme';

describe('Тесты для компонента Footer', () => {
    beforeEach(() => {
        setupTestsWrapper({initialRouterEntries: ['/']});
    });

    describe('Проверяем доступность элементов', () => {
        test('Проверяем доступность логотипа', () => {
            const footer = screen.getByTestId(ETestId.FOOTER);
            const footerLogo = getByTestId(footer, ETestId.MAIN_LOGO);
            expect(footerLogo).toBeInTheDocument();
        });

        test('Проверяем доступность меню', () => {
            expect(screen.getByTestId(ETestId.FOOTER_MENU)).toBeInTheDocument();
        });

        test('Проверяем доступность блока с контактами', () => {
            expect(screen.getByTestId(ETestId.FOOTER_CONTACTS)).toBeInTheDocument();
        });
    });

    describe('Снапшот футера', () => {
        test('Snapshot', () => {
            const {asFragment} = render(
                <QueryClientProvider client={queryClient}>
                    <Theme>
                        <BrowserRouter basename="/">
                            <Footer />
                        </BrowserRouter>
                    </Theme>
                </QueryClientProvider>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
