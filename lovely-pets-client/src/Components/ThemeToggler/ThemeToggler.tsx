import {useTheme} from 'hooks/useTheme';
import styles from 'Components/ThemeToggler/ThemeToggler.module.css';
import {ReactComponent as MoonIcon} from 'assets/moon.svg';
import {ReactComponent as SunIcon} from 'assets/sun.svg';
import {ETestId} from '../../Enum';

export const ThemeToggler = () => {
    const {theme, setTheme} = useTheme();

    const handleSwitchTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    const props = {
        'data-test-id': ETestId.HEADER_THEME_TOGGLE,
        className: styles.logo,
        onClick: handleSwitchTheme,
    };

    return theme === 'dark' ? <SunIcon {...props} /> : <MoonIcon {...props} />;
};
