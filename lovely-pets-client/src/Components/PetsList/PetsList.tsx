import {PetItem} from 'Components/PetItem/PetItem';
import styles from 'Components/PetsList/PetsList.module.css';

interface IPetsListProps {
    pets: IPet[];
}

export const PetsList = ({pets}: IPetsListProps) => (
    <div className={styles.productList}>
        {pets?.map((pet) => (
            <PetItem key={pet._id} pet={pet} />
        ))}
    </div>
);
