import {ReactComponent as InstagramIcon} from 'assets/logo-instagram.svg';
import {ReactComponent as VkIcon} from 'assets/logo-vk.svg';
import {ReactComponent as TgIcon} from 'assets/telegram.svg';
import {ReactComponent as ViberIcon} from 'assets/viber.svg';
import {ReactComponent as WhatsappIcon} from 'assets/whatsapp.svg';
import FooterContainer, {EContainerType} from 'Components/Common/Container/Container';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Components/Footer/Footer.module.css';
import {ETestId} from 'Enum';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {cartStore} from 'Store/cartStore';
import {useStore} from '@tanstack/react-store';
import {Logo} from '../Common/Logo/Logo';

enum EMenuItem {
    CATALOG = 'CATALOG',
    FAVOURITES = 'FAVOURITES',
    CART = 'CART',
    USER_PROFILE = 'USER_PROFILE',
}

export const Footer = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState<keyof typeof EMenuItem>(EMenuItem.CATALOG);
    const {t} = useTranslation();

    const cartCount = useStore(cartStore, (state) => Object.keys(state).length);

    const handleChangeMenuItem = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setSelectedMenuItem(event.currentTarget.dataset.itemId as keyof typeof EMenuItem);
    };

    const renderFooterLogo = () => (
        <div className={styles['logo-block']}>
            <Logo />
            <Text type={ETextType.S2} value={'© «Питомник домашних котиков lovelyPets.ru»'} />
        </div>
    );
    const renderMenu = () => {
        const menuConfig = Object.keys(EMenuItem).map((item) => {
            const menuItem = item.toLowerCase();

            return {
                key: item,
                label: t(`footer.menu.${menuItem}`),
                path: `/${item === EMenuItem.CATALOG ? '' : menuItem}`,
            };
        });

        const fakeMenu = [
            t('footer.fake_menu.payment_and_delivery'),
            t('footer.fake_menu.often_asked'),
            t('footer.fake_menu.feedback'),
            t('footer.fake_menu.contacts'),
        ];

        return (
            <>
                <ul data-test-id={ETestId.FOOTER_MENU}>
                    {menuConfig.map(({key, label, path}) => {
                        const showBubble = !!cartCount && key === EMenuItem.CART;

                        return (
                            <li key={label}>
                                <Link
                                    className={styles.link}
                                    to={path}
                                    data-item-id={key}
                                    onClick={handleChangeMenuItem}
                                >
                                    {showBubble && <div className={styles.bubble}>{cartCount}</div>}
                                    <Text
                                        className={styles.textColor}
                                        type={ETextType.P2}
                                        value={label}
                                        weight={selectedMenuItem === key ? EFontWeight.GENERAL : EFontWeight.SECONDARY}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <ul data-testid={ETestId.FOOTER_MENU}>
                    {fakeMenu.map((menuItem) => {
                        return (
                            <li key={menuItem}>
                                <Text className={styles.textColor} type={ETextType.P2} value={menuItem} />
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    };

    const renderContactsGroup = () => (
        <div data-test-id={ETestId.FOOTER_CONTACTS} className={styles.contacts}>
            <Text value={t('footer.in_contact')} weight={EFontWeight.GENERAL} />
            <Text value={'8 (999) 00-00-00'} />
            <Text type={ETextType.S1} value={'lovelyPets@gmail.com'} />
            <div className={styles.social}>
                <IconButton>
                    <TgIcon className={styles.socialLogo} />
                </IconButton>
                <IconButton>
                    <WhatsappIcon className={styles.socialLogo} />
                </IconButton>
                <IconButton>
                    <ViberIcon className={styles.socialLogo} />
                </IconButton>
                <IconButton>
                    <InstagramIcon className={styles.socialLogo} />
                </IconButton>
                <IconButton>
                    <VkIcon className={styles.socialLogo} />
                </IconButton>
            </div>
        </div>
    );

    return (
        <FooterContainer className={styles.footer} type={EContainerType.FOOTER}>
            {renderFooterLogo()}
            {renderMenu()}
            {renderContactsGroup()}
        </FooterContainer>
    );
};
