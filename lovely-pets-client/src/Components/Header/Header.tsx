import Logo from 'assets/paw.svg';
import logOut from 'assets/log-out.svg';
import addNewIcon from 'assets/add-new.svg';
import HeaderContainer, {EContainerType} from 'Components/Common/Container/Container';
import styles from 'Components/Header/Header.module.css';
import {SearchForm} from 'Components/SearchForm/SearchForm';
import {useLocation, useNavigate} from 'react-router-dom';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {ELocale, ETestId} from 'Enum';
import i18next from 'i18next';
import {useState} from 'react';
import {removeLoginToStorage} from 'Utils/authUtils';

const getCurrentLocale = (prevLocale: ELocale): ELocale => {
    return prevLocale === ELocale.EN ? ELocale.RU : ELocale.EN;
};

export const Header = () => {
    const [locale, setLocale] = useState<ELocale>(
        getCurrentLocale(localStorage.getItem('locale') as ELocale) || ELocale.EN
    );

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const renderLogo = () => (
        <div className={styles.logo}>
            <img data-testid={ETestId.HEADER_MAIN_LOGO} height={56} src={Logo} alt="logoMain" />
            <Text type={ETextType.H1} weight={EFontWeight.GENERAL}>
                LovelyPets
            </Text>
        </div>
    );

    const redirect = (path: string) => () => navigate(path);

    const handleLogOut = () => {
        removeLoginToStorage();
        navigate('/signin');
    };

    const handleChangeLocale = () => {
        setLocale((prevLocale) => {
            const currentLocale = getCurrentLocale(prevLocale);

            localStorage.setItem('locale', prevLocale);
            i18next.changeLanguage(prevLocale);

            return currentLocale;
        });
    };

    const renderHeaderProfileIcons = () => {
        const headerIconConfig = [
            {name: addNewIcon, onClick: redirect('/addPet'), testId: ETestId.HEADER_ADD_NEW_ICON},
            {name: logOut, onClick: handleLogOut, testId: ETestId.HEADER_LOG_OUT_ICON},
        ];

        return (
            <div className={styles.profilesIcons}>
                <button className={styles.locale} onClick={handleChangeLocale}>
                    {locale}
                </button>
                {headerIconConfig.map(({name, onClick, testId}, index) => {
                    return (
                        <div key={index} className={styles.profilesIcon}>
                            <IconButton
                                className={styles.profilesIconImage}
                                testId={testId}
                                key={index}
                                icon={name}
                                onClick={onClick}
                                alt="headerIcon"
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <HeaderContainer className={styles.header} type={EContainerType.HEADER}>
            {renderLogo()}
            {pathname === '/' && <SearchForm />}
            {!['/signin', '/signup'].includes(pathname) && renderHeaderProfileIcons()}
        </HeaderContainer>
    );
};
