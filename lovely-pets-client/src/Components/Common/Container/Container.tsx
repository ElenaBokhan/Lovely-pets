import cn from 'classnames';
import styles from 'Components/Common/Container/Container.module.css';
import {Loader} from 'Components/Common/Loader/Loader';
import React from 'react';
import {useIsFetching} from '@tanstack/react-query';
import {ETestId} from '../../../Enum';

interface IContainerProps {
    className?: string;
    type: EContainerType;
    children: React.ReactNode;
}
export enum EContainerType {
    HEADER = 'headerContainer',
    FOOTER = 'footerContainer',
    MAIN = 'mainContainer',
}

const Container: React.FC<IContainerProps> = ({children, type, className}: IContainerProps) => {
    const isFetchingPets = useIsFetching({queryKey: ['pets']});

    const getContent = () => <div className={cn(styles.container, className)}>{children}</div>;

    const getContainer = () => {
        switch (type) {
            case EContainerType.HEADER:
                return (
                    <header data-test-id={ETestId.HEADER} className={styles[type]}>
                        {getContent()}
                    </header>
                );
            case EContainerType.MAIN:
                return (
                    <main className={styles[type]}>
                        {!!isFetchingPets && <Loader />}
                        {getContent()}
                    </main>
                );
            case EContainerType.FOOTER:
                return (
                    <footer data-test-id={ETestId.FOOTER} className={styles[type]}>
                        {getContent()}
                    </footer>
                );
        }
    };

    return getContainer();
};

export default Container;
