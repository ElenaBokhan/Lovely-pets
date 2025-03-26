import instagramIcon from 'assets/logo-instagram.svg';
import vkIcon from 'assets/logo-vk.svg';
import Logo from 'assets/paw.svg';
import tgIcon from 'assets/telegram 1.svg';
import viberIcon from 'assets/viber 1.svg';
import whatsappIcon from 'assets/whatsapp 1.svg';
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
            <div className={styles.logo}>
                <img data-testid={ETestId.HEADER_MAIN_LOGO} height={56} src={Logo} alt="logoMain" />
                <Text type={ETextType.H1} weight={EFontWeight.GENERAL}>
                    LovelyPets
                </Text>
            </div>
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
                <ul data-testid={ETestId.FOOTER_MENU}>
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
                                <Text type={ETextType.P2} value={menuItem} />
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    };

    const renderContactsGroup = () => (
        <div data-testid={ETestId.FOOTER_CONTACTS} className={styles.contacts}>
            <Text value={t('footer.in_contact')} weight={EFontWeight.GENERAL} />
            <Text value={'8 (999) 00-00-00'} />
            <Text type={ETextType.S1} value={'lovelyPets@gmail.com'} />
            <div className={styles.social}>
                <IconButton alt="telegramLogo" icon={tgIcon} />
                <IconButton alt="whatsappLogo" icon={whatsappIcon} />
                <IconButton alt="viberLogo" icon={viberIcon} />
                <IconButton alt="instagramLogo" icon={instagramIcon} />
                <IconButton alt="vkLogo" icon={vkIcon} />
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
