import {useTheme} from 'hooks/useTheme';
import styles from 'Components/ThemeToggler/ThemeToggler.module.css';
import {ReactComponent as MoonIcon} from 'assets/moon.svg';
import {ReactComponent as SunIcon} from 'assets/sun.svg';

export const ThemeToggler = () => {
    const {theme, setTheme} = useTheme();

    const handleSwitchTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return theme === 'dark' ? (
        <SunIcon className={styles.logo} onClick={handleSwitchTheme} />
    ) : (
        <MoonIcon className={styles.logo} onClick={handleSwitchTheme} />
    );
};
