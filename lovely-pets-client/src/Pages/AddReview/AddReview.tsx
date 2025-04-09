import {Button} from 'Components/Common/Button/Button';
import {Text} from 'Components/Common/Text/Text';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import styles from 'Pages/AddReview/AddReview.module.css';
import {useLocation, useNavigate} from 'react-router-dom';
import starFillIcon from 'assets/ic-star-fill.svg';
import starIcon from 'assets/ic-star.svg';
import {useState} from 'react';
import {ETestId} from 'Enum';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {Gap} from 'Components/Common/Gap/Gap';
import {useAddReviewMutation} from 'Api/queryHooks';
import {useTranslation} from 'react-i18next';

export const AddReview = () => {
    const {state} = useLocation();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const {t} = useTranslation();

    const {mutateAsync: addReview} = useAddReviewMutation();
    const navigate = useNavigate();

    const [reviewText, setReviewText] = useState<string>('');
    const [currentRating, setCurrentRating] = useState<number>(null);

    const handleReviewChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const reviewText = event.currentTarget.value;
        setReviewText(reviewText);
    };

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (currentRating || reviewText) {
            const updatedPet: IPet = await addReview({
                petId: state?._id,
                rating: currentRating,
                text: reviewText,
                userId,
                userName,
            });
            navigate(`/pets/${updatedPet._id}`);
        }
    };

    const handleSetRating = (rate: number) => {
        setCurrentRating(rate);
    };

    const renderStars = () => {
        return (
            <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
                    <IconButton
                        onClick={() => handleSetRating(index + 1)}
                        key={index}
                        icon={index < currentRating ? starFillIcon : starIcon}
                        alt={'ratingProduct'}
                    />
                ))}
            </div>
        );
    };

    const renderAddReviewForm = () => {
        return (
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <Text value={t('pages.review.rating')} />
                    {renderStars()}
                </div>
                <div className={styles.field}>
                    <Text value={t('pages.review.comment.label')} />
                    <input
                        className={styles.reviewTextarea}
                        type="textarea"
                        data-test-id={ETestId.ADD_REVIEW_TEXT_INPUT}
                        onChange={handleReviewChange}
                        placeholder={t('pages.review.comment.placeholder')}
                        value={reviewText}
                    />
                </div>
                <Button
                    testId={ETestId.ADD_REVIEW_SUBMIT_BUTTON}
                    type="submit"
                    label={t('pages.review.submit_button')}
                />
            </form>
        );
    };

    return (
        <div className={styles.addReviewPage}>
            <TitlePage label={t('pages.review.title', {name: state?.name})} />
            <Gap size={40} />
            <hr />
            {renderAddReviewForm()}
        </div>
    );
};
