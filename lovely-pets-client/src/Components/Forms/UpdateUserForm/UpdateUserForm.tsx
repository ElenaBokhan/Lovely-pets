import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from 'Components/Common/Button/Button';
import {Input} from 'Components/Common/Input/Input';
import {ETextType, Text} from 'Components/Common/Text/Text';
import {SubmitHandler, useForm} from 'react-hook-form';
import {TFormUpdateUserData} from 'Components/Forms/Helpers/types';
import {updateUserFormSchema} from 'Components/Forms/Helpers/validators';
import styles from 'Components/Forms/UpdateUserForm/UpdateUserForm.module.css';

export const UpdateUserForm = ({onCloseForm}: {onCloseForm: () => void}) => {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting, isValid, isSubmitted},
    } = useForm<TFormUpdateUserData>({
        resolver: yupResolver(updateUserFormSchema),
        defaultValues: {
            name: '',
            about: '',
        },
    });

    const renderButtonsControl = () => (
        <Button
            disable={isSubmitting || (isSubmitted && (!isValid || isSubmitting))}
            label={'Изменить'}
            type={'submit'}
        />
    );

    const onSubmit: SubmitHandler<TFormUpdateUserData> = async (value) => {
        //     try {
        //         const data = await updateUser(value).unwrap();
        //         setUserProfile(data);
        //         onCloseForm();
        //     } catch (e) {
        //         toast.error(getMessageFromError(e, 'Неизвестная ошибка'));
        //     }
        console.log(value);
        console.log(onCloseForm);
    };

    return (
        <form className={styles.addReviewPage} onSubmit={handleSubmit(onSubmit)}>
            <Text type={ETextType.H2} value={'Изменить данные пользователя'} />
            <div>
                <Input errors={errors} label={'name'} register={register} />
                <Input errors={errors} label={'about'} register={register} />
            </div>
            {renderButtonsControl()}
        </form>
    );
};
