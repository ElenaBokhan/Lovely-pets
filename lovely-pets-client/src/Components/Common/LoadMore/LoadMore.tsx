import styles from 'Components/Common/LoadMore/LoadMore.module.css';
import {useLayoutEffect, useRef} from 'react';

export const LoadMore = ({action, hasNextPage}: {action: () => void; hasNextPage: boolean}) => {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let observer: IntersectionObserver | undefined = undefined;

        if (hasNextPage) {
            const options: IntersectionObserverInit = {
                threshold: 0.5,
            };

            const callback: IntersectionObserverCallback = ([loadMore]) => {
                if (loadMore.isIntersecting) {
                    action();
                }
            };
            observer = new IntersectionObserver(callback, options);

            ref.current && observer.observe(ref.current);
        }

        return () => {
            observer && observer.disconnect();
        };
    }, [action, hasNextPage]);

    return <div ref={ref} className={styles.loadMore}></div>;
};
