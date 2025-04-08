import {ReactComponent as LogOut} from 'assets/log-out.svg';
import {ReactComponent as AddNewIcon} from 'assets/add-new.svg';
import HeaderContainer, {EContainerType} from 'Components/Common/Container/Container';
import styles from 'Components/Header/Header.module.css';
import {SearchForm} from 'Components/SearchForm/SearchForm';
import {useLocation, useNavigate} from 'react-router-dom';
import {ETestId} from 'Enum';
import {removeLoginToStorage} from 'Utils/authUtils';
import {ThemeToggler} from 'Components/ThemeToggler/ThemeToggler';
import {Logo} from 'Components/Common/Logo/Logo';
import {LocaleToggler} from 'Components/LocaleToggler/LocaleToggler';

export const Header = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const redirect = (path: string) => () => navigate(path);

    const handleLogOut = () => {
        removeLoginToStorage();
        navigate('/signin');
    };

    const renderHeaderProfileIcons = () => {
        return (
            <div className={styles.profilesIcons}>
                <LocaleToggler />
                <ThemeToggler />
                <AddNewIcon
                    className={styles.logo}
                    onClick={redirect('/addPet')}
                    data-test-id={ETestId.HEADER_ADD_NEW_ICON}
                />
                <LogOut className={styles.logo} onClick={handleLogOut} data-test-id={ETestId.HEADER_LOG_OUT_ICON} />
            </div>
        );
    };

    return (
        <HeaderContainer className={styles.header} type={EContainerType.HEADER}>
            <Logo />
            {pathname === '/' && <SearchForm />}
            {!['/signin', '/signup'].includes(pathname) && renderHeaderProfileIcons()}
        </HeaderContainer>
    );
};
