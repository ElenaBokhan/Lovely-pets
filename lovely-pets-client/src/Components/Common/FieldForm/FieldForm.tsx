import styles from 'Components/Common/FieldForm/FieldForm.module.css';
import {Text} from 'Components/Common/Text/Text';
import {IPetField} from 'Pages/AddProduct/AddProduct';
import {useTranslation} from 'react-i18next';

interface IFieldFormProps {
    onChange?: (value: string, field: keyof INewProduct) => void;
    field: IPetField;
}

export const FieldForm = ({field: {value, label, param, testId}, onChange}: IFieldFormProps) => {
    const {t} = useTranslation();

    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const target = event.currentTarget.value;
        onChange(target, param);
    };

    return (
        <div className={styles.field}>
            <Text value={label} />
            <input
                className={styles.fieldTextarea}
                data-test-id={testId}
                onChange={handleChange}
                placeholder={t('pages.add_product.placeholder')}
                value={value}
                type="text"
            />
        </div>
    );
};
