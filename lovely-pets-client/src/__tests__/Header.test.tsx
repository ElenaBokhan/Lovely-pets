import '@testing-library/jest-dom';
import {setupTestsWrapper} from 'Utils/setupTestWrapper';
import {getByTestId, render, screen} from '@testing-library/react';
import {ETestId} from 'Enum';
import Theme from 'Components/Theme/Theme';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from 'App';
import {BrowserRouter} from 'react-router-dom';
import {Header} from 'Components/Header/Header';

describe('Тесты для компонента Header', () => {
    beforeEach(() => {
        setupTestsWrapper({initialRouterEntries: ['/']});
    });

    describe('Проверяем доступность элементов под неавторизованным пользователем', () => {
        checkHeaderMainLogoIsAvailable();
        checkHeaderProfilesIconAvailable(false);
        checkHeaderSearchInputAvailable(false);
    });

    describe('Проверяем доступность ссылок под авторизованным пользователем', () => {
        beforeEach(() => {
            jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'token');
        });

        checkHeaderMainLogoIsAvailable();
        checkHeaderProfilesIconAvailable(true);
        checkHeaderSearchInputAvailable(true);
    });

    describe('Снапшот компонента Header', () => {
        test('Snapshot', () => {
            const {asFragment} = render(
                <QueryClientProvider client={queryClient}>
                    <Theme>
                        <BrowserRouter basename="/">
                            <Header />
                        </BrowserRouter>
                    </Theme>
                </QueryClientProvider>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});

function checkHeaderMainLogoIsAvailable() {
    test('Проверяем доступность логотипа', () => {
        const header = screen.getByTestId(ETestId.HEADER);
        const headerLogo = getByTestId(header, ETestId.MAIN_LOGO);
        expect(headerLogo).toBeInTheDocument();
    });
}

function checkHeaderProfilesIconAvailable(enable: boolean) {
    if (enable) {
        test('Проверяем доступность иконок профиля', () => {
            expect(screen.getByTestId(ETestId.HEADER_LOCALE_TOGGLE)).toBeInTheDocument();
            expect(screen.getByTestId(ETestId.HEADER_THEME_TOGGLE)).toBeInTheDocument();
            expect(screen.getByTestId(ETestId.HEADER_ADD_NEW_ICON)).toBeInTheDocument();
            expect(screen.getByTestId(ETestId.HEADER_LOG_OUT_ICON)).toBeInTheDocument();
        });
    } else {
        test('Проверяем не доступность иконок профиля', () => {
            expect(screen.queryByTestId(ETestId.HEADER_LOCALE_TOGGLE)).not.toBeInTheDocument();
            expect(screen.queryByTestId(ETestId.HEADER_THEME_TOGGLE)).not.toBeInTheDocument();
            expect(screen.queryByTestId(ETestId.HEADER_ADD_NEW_ICON)).not.toBeInTheDocument();
            expect(screen.queryByTestId(ETestId.HEADER_LOG_OUT_ICON)).not.toBeInTheDocument();
        });
    }
}

function checkHeaderSearchInputAvailable(enable: boolean) {
    if (enable) {
        test('Проверяем доступность компонента поиска', () => {
            expect(screen.getByTestId(ETestId.HEADER_SEARCH_INPUT)).toBeInTheDocument();
        });
    } else {
        test('Проверяем не доступность компонента поиска', () => {
            expect(screen.queryByTestId(ETestId.HEADER_SEARCH_INPUT)).not.toBeInTheDocument();
        });
    }
}
