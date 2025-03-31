import cn from 'classnames';
import styles from 'Components/Common/IconButton/IconButton.module.css';
import {ETestId} from 'Enum';

interface IButtonIconProps {
    type?: string;
    icon?: string;
    alt?: string;
    onClick?: () => void;
    className?: string;
    testId?: ETestId;
    children?: React.ReactNode;
}

export const IconButton = ({alt, className, icon, onClick, testId, children}: IButtonIconProps) => {
    const style = className ? cn(styles.button, className) : styles.button;

    return (
        <button className={style} onClick={onClick} type="button">
            {children || <img data-testid={testId} alt={alt} src={icon} />}
        </button>
    );
};
