import * as commonUtils from 'Utils/utils';

describe('Тесты для утилит', () => {
    describe(`Тесты для утилиты ${commonUtils.isPetFavourite}`, () => {
        const likes = ['123'];

        test('Определяет содержит ли набор лайков товара пользовательский лайк', () => {
            const isFavouriteSpy = jest.spyOn(commonUtils, 'isPetFavourite');
            expect(commonUtils.isPetFavourite(likes, '123')).toBeTruthy();
            expect(isFavouriteSpy).toHaveBeenCalledTimes(1);
        });

        test('Определяет что набор лайков товара не содержит пользовательский лайк', () => {
            const isFavouriteSpy = jest.spyOn(commonUtils, 'isPetFavourite');
            expect(commonUtils.isPetFavourite(likes, '456')).toBeFalsy();
            expect(isFavouriteSpy).toHaveBeenCalledTimes(1);
        });
    });
});
