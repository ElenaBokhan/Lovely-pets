import styles from 'Components/Common/FieldForm/FieldForm.module.css';
import {Text} from 'Components/Common/Text/Text';
import {IPetField} from 'Pages/AddProduct/AddProduct';

interface IFieldFormProps {
    onChange?: (value: string, field: keyof INewProduct) => void;
    field: IPetField;
}

export const FieldForm = ({field: {value, label, param, testId}, onChange}: IFieldFormProps) => {
    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const target = event.currentTarget.value;
        onChange(target, param);
    };

    return (
        <div className={styles.field}>
            <Text value={label} />
            <input
                className={styles.fieldTextarea}
                data-testid={testId}
                onChange={handleChange}
                placeholder={'Укажите значение'}
                value={value}
                type="text"
            />
        </div>
    );
};
