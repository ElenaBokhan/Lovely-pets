import {Breadcrumbs} from 'Components/Common/Breadcrumbs/Breadcrumbs';
import {ETextType, Text} from 'Components/Common/Text/Text';
import {ETestId} from 'Enum';
import styles from 'Components/Common/TitlePage/TitlePage.module.css';

interface ITitleProps {
    label: string;
    pathName?: string;
}

export const TitlePage = ({label, pathName}: ITitleProps) => (
    <div className={styles.title} data-testid={ETestId.TITLE_PAGE}>
        <Breadcrumbs pathName={pathName} />
        <Text type={ETextType.H1} value={label} />
    </div>
);
