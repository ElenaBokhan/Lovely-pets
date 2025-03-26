import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEn from 'Translations/en/translation.json';
import translationRu from 'Translations/ru/translation.json';
import {ELocale} from 'Enum';

const resources = {
    [ELocale.EN]: {translation: translationEn},
    [ELocale.RU]: {translation: translationRu},
};

i18next.use(initReactI18next).init({
    lng: localStorage.getItem('locale') || ELocale.RU,
    debug: true,
    resources,
    fallbackLng: ELocale.RU,
});
