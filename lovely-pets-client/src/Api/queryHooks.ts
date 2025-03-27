import {InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AuthClient, ILoginRequest, IRegistrationRequest} from 'Api/authClient';
import {PetsClient} from 'Api/petsClient';
import {petsListFilterStore} from 'Store/petsListFilterStore';
import {toast} from 'react-toastify';
import {getMessageFromError} from 'Utils/errorUtils';

export const useLoginMutation = () => {
    return useMutation<void, IError, ILoginRequest>({
        mutationFn: (loginData: ILoginRequest) => AuthClient.login(loginData),
        onSuccess: () => {
            toast.success('Вы успешно залогинены');
        },
        onError: (error) => {
            toast.error(getMessageFromError(error, error.message));
            // return Promise.reject(error);
        },
    });
};

export const useRegistrationMutation = () => {
    return useMutation({
        mutationFn: (userData: IRegistrationRequest) => AuthClient.registration(userData),
    });
};

export const useCreatePetMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (pet: INewProduct) => PetsClient.createPet(pet),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['pets']}),
    });
};

export const useDeletePetMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => PetsClient.removePet(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['pets']}),
    });
};

// export const useGetPetsList = (filter: IPetsListFilter) => {
//     return useQuery({
//         queryFn: () => PetsClient.getPetsList(filter),
//         queryKey: ['pets', filter],
//         staleTime: Infinity,
//     });
// };

export const useGetPetsList = (filter: IPetsListFilter) => {
    return useInfiniteQuery({
        queryFn: ({pageParam}) => {
            return PetsClient.getPetsList({...filter, pagination: pageParam});
        },
        queryKey: ['pets', filter],
        staleTime: Infinity,
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.length === 0) return undefined;
            return lastPageParam + 1;
        },
    });
};

export const useGetFavouritesList = () => {
    const userId = localStorage.getItem('userId');

    return useQuery<IPet[], unknown>({
        queryFn: () => PetsClient.getFavouritesList(userId),
        queryKey: ['favourites'],
        staleTime: Infinity,
    });
};

export const useGetPet = (id: string) => {
    return useQuery({
        queryFn: () => PetsClient.getPet(id),
        queryKey: ['pet', id],
        staleTime: Infinity,
    });
};

export const useAddToFavouriteMutation = () => {
    return useMutation({
        mutationFn: (data: IAddToFavourite) => PetsClient.addToFavourite(data),
    });
};

export const useRemoveFromFavouriteMutation = () => {
    return useMutation({
        mutationFn: (data: IAddToFavourite) => PetsClient.removeFromFavourite(data),
    });
};

export const useToggleListFavouriteMutation = () => {
    const queryClient = useQueryClient();
    const filter = petsListFilterStore.state;

    return useMutation({
        mutationFn: PetsClient.toggleFavourite,
        onMutate: async (data: IAddToFavourite) => {
            await queryClient.cancelQueries({queryKey: ['pets']});

            const previousPetsList: InfiniteData<IPet[], number[]> = queryClient.getQueryData(['pets', filter]);

            const {isFavourite, petId, userId} = data;

            queryClient.setQueryData(['pets', filter], (oldData: InfiniteData<IPet[], number[]>) => {
                const newData = oldData?.pages.map((page) =>
                    page.map((pet) => {
                        if (pet._id === petId) {
                            return {
                                ...pet,
                                likes: isFavourite
                                    ? pet.likes.filter((like) => like !== userId)
                                    : [...pet.likes, userId],
                            };
                        }

                        return pet;
                    })
                );
                return {
                    ...oldData,
                    pages: newData,
                };
            });

            return {previousPetsList};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['pets'], context.previousPetsList);
        },
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({queryKey: ['pet', data.petId]});
            queryClient.invalidateQueries({queryKey: ['pets']});
            queryClient.invalidateQueries({queryKey: ['favourites']});
        },
    });
};

export const useTogglePetFavouriteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetsClient.toggleFavourite,
        onMutate: async (data: IAddToFavourite) => {
            const {isFavourite, petId, userId} = data;
            // await queryClient.cancelQueries({queryKey: ['pet', petId]});

            const previousPet: IPet = queryClient.getQueryData(['pet', petId]);

            queryClient.setQueryData(['pet', petId], {
                ...previousPet,
                likes: isFavourite
                    ? previousPet.likes.filter((like) => like !== userId)
                    : [...previousPet.likes, userId],
            });

            return {previousPet};
        },
        onError: (err, data, context) => {
            queryClient.setQueryData(['pet', data.petId], context.previousPet);
            console.log(err);
        },
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({queryKey: ['pet', data.petId]});
            queryClient.invalidateQueries({queryKey: ['pets']});
            queryClient.invalidateQueries({queryKey: ['favourites']});
        },
    });
};

export const useAddReviewMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IAddReviewRequest) => PetsClient.addReview(data),
        onSuccess: (response, data) => {
            queryClient.setQueryData(['pet', data.petId], response);
        },
    });
};
