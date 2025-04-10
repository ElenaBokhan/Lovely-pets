import cn from 'classnames';
import styles from 'Components/Common/Text/Text.module.css';
import React from 'react';

interface ITextProps {
    className?: string;
    fontColor?: EFontColor;
    type?: ETextType;
    weight?: EFontWeight;
    value?: string | number;
    children?: React.ReactNode;
    testId?: string;
}

export enum EFontWeight {
    GENERAL = 'bold',
    SECONDARY = 'normal',
}

export enum EFontColor {
    RED = 'red',
    BLACK = 'black',
    GREY = 'grey',
    YELLOW = 'yellow',
}

export enum ETextType {
    H0 = 'head0',
    H1 = 'head1',
    H2 = 'head2',
    H3 = 'head3',
    P1 = 'paragraph1',
    P2 = 'paragraph2',
    S1 = 'subscribe1',
    S2 = 'subscribe2',
    EXTRA = 'extra',
}

export const Text = ({children, fontColor, type = ETextType.P1, value, weight, className, testId}: ITextProps) => {
    const stylesCN = cn(className, styles[fontColor], styles[weight], styles[type]);
    return (
        <span className={stylesCN} data-testid={testId}>
            {value}
            {children}
        </span>
    );
};
