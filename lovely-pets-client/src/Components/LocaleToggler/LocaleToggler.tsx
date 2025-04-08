import styles from 'Components/LocaleToggler/LocaleToggler.module.css';
import {useState} from 'react';
import {ELocale, ETestId} from 'Enum';
import {changeLanguage} from 'i18next';

const getCurrentLocale = (prevLocale: ELocale): ELocale => {
    return prevLocale === ELocale.EN ? ELocale.RU : ELocale.EN;
};

export const LocaleToggler = () => {
    const [locale, setLocale] = useState<ELocale>(
        getCurrentLocale(localStorage.getItem('locale') as ELocale) || ELocale.EN
    );

    const handleChangeLocale = () => {
        setLocale((prevLocale) => {
            const currentLocale = getCurrentLocale(prevLocale);

            localStorage.setItem('locale', prevLocale);
            changeLanguage(prevLocale);

            return currentLocale;
        });
    };

    return (
        <button data-test-id={ETestId.HEADER_LOCALE_TOGGLE} className={styles.locale} onClick={handleChangeLocale}>
            {locale}
        </button>
    );
};
