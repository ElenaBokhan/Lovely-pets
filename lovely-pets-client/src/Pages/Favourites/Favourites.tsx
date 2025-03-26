import {NotFound} from 'Components/Common/NotFound/NotFound';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import {PetsList} from 'Components/PetsList/PetsList';
import style from 'Pages/Favourites/Favourites.module.css';
import {useTranslation} from 'react-i18next';
import {useGetFavouritesList} from 'Api/queryHooks';
import {withProtection} from 'HOCs/withProtection';

export const Favourites = withProtection(() => {
    const {data: favourites} = useGetFavouritesList();
    const {t} = useTranslation();

    return (
        <div className={style.favourites}>
            <TitlePage label={t('pages.favourites.title')} />
            {favourites?.length > 0 ? (
                <div className={style.favouritesList}>
                    <PetsList pets={favourites} />
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
});
