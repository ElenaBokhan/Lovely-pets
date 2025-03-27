import styles from 'Components/Placeholders/Placeholder.module.css';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import qualityIcon from 'assets/ic-quality.svg';
import {useTranslation} from 'react-i18next';

export const QualityPlaceholder = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.placeholder}>
            <img src={qualityIcon} alt="truckIcon" />
            <div className={styles.deliveryPrice}>
                <Text weight={EFontWeight.GENERAL} value={t('placeholder.quality.title')} />
                <Text type={ETextType.P2}> {t('placeholder.quality.text')}</Text>
            </div>
        </div>
    );
};
