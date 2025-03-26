import styles from 'Style/Helper.module.css';
import {SignInForm} from 'Components/Forms/SignInForm/SignInForm';

export const SignIn = () => {
    return (
        <div className={styles.center}>
            <SignInForm />
        </div>
    );
};
