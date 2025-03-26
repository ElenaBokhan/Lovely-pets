import starFillIcon from 'assets/ic-star-fill.svg';
import starIcon from 'assets/ic-star.svg';
import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Style/Helper.module.css';
import {dateFormatter} from 'Utils/utils';
import {Gap} from 'Components/Common/Gap/Gap';

interface IReviewProps {
    review: IReview;
}

export const Review = ({review}: IReviewProps) => {
    const {userName, createdAt, rating, text} = review;

    const renderStars = () => {
        return (
            <div>
                {[...Array(5)].map((_, index) => (
                    <img alt="star" key={index} src={index < rating ? starFillIcon : starIcon} />
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className={styles.flexSpaceBetween}>
                <div className={styles.flexColumn}>
                    <Text weight={EFontWeight.GENERAL} fontColor={EFontColor.YELLOW} value={userName} />
                    <Text
                        fontColor={EFontColor.GREY}
                        type={ETextType.S1}
                        value={dateFormatter.format(new Date(createdAt))}
                    />
                </div>
                {renderStars()}
            </div>
            <Gap size={16} />
            <Text value={text} />
        </div>
    );
};
