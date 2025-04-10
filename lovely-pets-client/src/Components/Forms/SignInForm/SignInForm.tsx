import {yupResolver} from '@hookform/resolvers/yup';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {Input} from 'Components/Common/Input/Input';
import {ETextType, Text} from 'Components/Common/Text/Text';
import {signInFormSchema} from 'Components/Forms/Helpers/validators';
import styles from 'Components/Forms/SignInForm/SignInForm.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {TFormSignInData} from 'Components/Forms/Helpers/types';
import {useLocation, useNavigate} from 'react-router-dom';
import {objectHasProperty} from 'Utils/utils';
import {ETestId} from 'Enum';
import {useLoginMutation} from 'Api/queryHooks';

export const SignInForm = () => {
    const {mutateAsync: signInRequest} = useLoginMutation();

    const navigate = useNavigate();
    const {state} = useLocation();

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting, isValid, isSubmitted},
    } = useForm<TFormSignInData>({
        resolver: yupResolver(signInFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const redirectToSignUp = () => {
        navigate('/signup');
    };

    const redirect = () => {
        navigate(objectHasProperty(state, 'from') && typeof state.from === 'string' ? state.from : '/');
    };

    const renderButtonsControl = () => (
        <div className={styles.buttonsContainer}>
            <Button
                disable={isSubmitting || (isSubmitted && (!isValid || isSubmitting))}
                label={'Войти'}
                type={'submit'}
                testId={ETestId.SIGN_FORM_SUBMIT_BUTTON}
            />
            <Button
                theme={EButtonTheme.REDIRECT}
                onChange={redirectToSignUp}
                disable={isSubmitting}
                label={'Зарегистрироваться'}
            />
        </div>
    );

    const onSubmit: SubmitHandler<TFormSignInData> = async (value) => {
        try {
            await signInRequest(value);
            redirect();
        } catch (e) {}
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.modalContainer}>
                <Text type={ETextType.H2} value={'Вход'} />
                <div className={styles.inputsContainer}>
                    <Input testId={ETestId.SIGN_FORM_EMAIL_INPUT} errors={errors} label={'email'} register={register} />
                    <Input
                        testId={ETestId.SIGN_FORM_PASSWORD_INPUT}
                        errors={errors}
                        label={'password'}
                        register={register}
                    />
                </div>
                {renderButtonsControl()}
            </div>
        </form>
    );
};
