import {createContext, useEffect, useState} from 'react';
import {THEME_STORAGE_KEY} from 'Const';

const supportedThemes = {
    light: 'light',
    dark: 'dark',
};

type Themes = keyof typeof supportedThemes;

export const ThemeContext = createContext<
    | {
          theme: Themes;
          setTheme: (theme: Themes) => void;
          supportedThemes: {[key: string]: string};
      }
    | undefined
>(undefined);

const getTheme = (): Themes => {
    let theme = localStorage.getItem(THEME_STORAGE_KEY);

    if (!theme) {
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
        theme = 'light';
    }

    return theme as Themes;
};

const Theme = (props: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<Themes>(getTheme);

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                supportedThemes,
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export default Theme;
