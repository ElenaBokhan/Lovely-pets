import {Button} from 'Components/Common/Button/Button';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import styles from 'Pages/AddReview/AddReview.module.css';
import {useState} from 'react';
import {Gap} from 'Components/Common/Gap/Gap';
import {FieldForm} from 'Components/Common/FieldForm/FieldForm';
import {useNavigate} from 'react-router-dom';
import {ETestId} from 'Enum';
import {useCreatePetMutation} from 'Api/queryHooks';
import {useTranslation} from 'react-i18next';

export interface IPetField {
    label: string;
    value: string | number;
    param: keyof INewProduct;
    testId: ETestId;
}

export const AddProduct = () => {
    const {mutateAsync: createPet} = useCreatePetMutation();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const getInitialProduct = (): IPetField[] => [
        {
            param: 'name',
            label: t('pages.add_product.fields.name'),
            value: '',
            testId: ETestId.ADD_PRODUCT_NAME_INPUT,
        },
        {
            param: 'price',
            label: t('pages.add_product.fields.price'),
            value: '',
            testId: ETestId.ADD_PRODUCT_PRICE_INPUT,
        },
        {
            param: 'description',
            label: t('pages.add_product.fields.description'),
            value: '',
            testId: ETestId.ADD_PRODUCT_DESCRIPTION_INPUT,
        },
        {
            param: 'discount',
            label: t('pages.add_product.fields.discount'),
            value: '',
            testId: ETestId.ADD_PRODUCT_DISCOUNT_INPUT,
        },
        {
            param: 'stock',
            label: t('pages.add_product.fields.stock'),
            value: '',
            testId: ETestId.ADD_PRODUCT_STOCK_INPUT,
        },
        {
            param: 'wight',
            label: t('pages.add_product.fields.wight'),
            value: '',
            testId: ETestId.ADD_PRODUCT_WIGHT_INPUT,
        },
        {
            param: 'pictures',
            label: t('pages.add_product.fields.picture'),
            value: '',
            testId: ETestId.ADD_PRODUCT_PICTURES_INPUT,
        },
    ];

    const [pet, setPet] = useState<IPetField[]>(() => getInitialProduct());

    const isNotEmptyValues = (): boolean => {
        for (const field of pet) {
            if (field.value === '') return false;
        }

        return true;
    };

    const getNewProduct = (): INewProduct => {
        const newPet = {} as INewProduct;

        pet.forEach(({value, param}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newPet[param] = value;
        });

        return newPet;
    };

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (isNotEmptyValues()) {
                const createdPet = await createPet(getNewProduct());

                navigate(`/${createdPet._id}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSetProduct = (value: string, param: keyof IPet) => {
        const currentValue = param === 'price' || param === 'discount' || param === 'stock' ? Number(value) : value;

        const newProducts: IPetField[] = pet.map((item) =>
            item.param === param ? {...item, value: currentValue} : item
        );
        setPet(newProducts);
    };

    const renderAddProductForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                {pet.map((field) => (
                    <FieldForm key={field.label} onChange={handleSetProduct} field={field} />
                ))}

                <Button testId={ETestId.ADD_PRODUCT_SUBMIT_BUTTON} type="submit" label={t('button.add_cat')} />
            </form>
        );
    };

    return (
        <div className={styles.addReviewPage}>
            <TitlePage label={t('pages.add_product.title')} />
            <Gap size={40} />
            <hr />
            {renderAddProductForm()}
        </div>
    );
};
