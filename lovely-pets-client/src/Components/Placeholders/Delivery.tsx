import styles from 'Components/Placeholders/Placeholder.module.css';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import truckIcon from 'assets/ic-truck.svg';
import {useTranslation} from 'react-i18next';

export const DeliveryPlaceholder = () => {
    const {t} = useTranslation();

    const valuePlaceOfService = (
        <span>
            {t('placeholder.delivery.delivery_to_office')} — <b>{t('placeholder.delivery.from')} 199 Р</b>
        </span>
    );

    const valueCourier = (
        <span>
            {t('placeholder.delivery.delivery_by_courier')} — <b>{t('placeholder.delivery.from')} 399 Р</b>
        </span>
    );

    return (
        <div className={styles.placeholder}>
            <img src={truckIcon} alt="truckIcon" />
            <div className={styles.deliveryPrice}>
                <Text weight={EFontWeight.GENERAL} value={t('placeholder.delivery.title')} />
                <Text type={ETextType.P2}>{valuePlaceOfService}</Text>
                <Text type={ETextType.P2}>{valueCourier}</Text>
            </div>
        </div>
    );
};
