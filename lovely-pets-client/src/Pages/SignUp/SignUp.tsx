import styles from 'Style/Helper.module.css';
import {SignUpForm} from 'Components/Forms/SignUpForm/SignUpForm';

export const SignUp = () => {
    return (
        <div className={styles.center}>
            <SignUpForm />
        </div>
    );
};
