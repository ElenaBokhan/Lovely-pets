import {ReactComponent as LogoIcon} from 'assets/paw.svg';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Components/Common/Logo/Logo.module.css';
import {ETestId} from 'Enum';

export const Logo = () => (
    <div className={styles.logoWrapper}>
        <LogoIcon className={styles.logo} data-testid={ETestId.HEADER_MAIN_LOGO} height={56} alt="logoMain" />
        <Text type={ETextType.H1} weight={EFontWeight.GENERAL}>
            LovelyPets
        </Text>
    </div>
);
