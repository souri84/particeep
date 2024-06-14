import {configureStore, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieType} from "@/lib/types.ts";
import {movies$} from '../movies.ts';

export interface RootStateType {
    movies: MoviesState
}

export interface MoviesState {
    movies: MovieType[],
    allMovies: MovieType[],
    categories: string[],
    selectedCategories: string[],
    votes: string[],
    pagination: {
        currentPage: number,
        totalPages: number,
        itemsPerPage: number,
        totalItems: number,
    },
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: MoviesState = {
    categories: [],
    selectedCategories: [],
    allMovies: [],
    movies: [],
    votes: [],
    pagination: {
        currentPage: 1,
        totalPages: 0,
        itemsPerPage: 4,
        totalItems: 0,
    },
    status: 'idle'
}

export const getMovies = createAsyncThunk<
    { movies: MovieType[]; categories: string[], totalItems: number},
    string[]
>('movies/getMovies', async (categories: string[]): Promise<{
    movies: MovieType[];
    categories: string[],
    totalItems: number
}> => {
    const movies = await movies$;

    if (!Array.isArray(movies) || movies.length === 0) {
        throw new Error('Movies is not an array or is empty');
    }

    const allCategories: string[] = Array.from(new Set(movies.map((movie: MovieType) => movie.category)));
    if (categories.length > 0) {
        const filteredMovies = movies.filter((movie: MovieType) => categories.includes(movie.category));
        return {movies: filteredMovies, categories: allCategories, totalItems: filteredMovies.length};
    }

    return {movies, categories: allCategories, totalItems: movies.length};
});


export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        likeMovie: (state, action: PayloadAction<string>) => {
            const movie = state.movies.find((movie) => movie.id === action.payload);
            if (movie) {
                movie.likes++;
                const index = state.movies.findIndex((movie) => movie.id === action.payload);
                state.movies[index] = movie;
                state.votes.push(movie.id)
            }
        },
        dislikeMovie: (state, action: PayloadAction<string>) => {
            const movie = state.movies.find((movie) => movie.id === action.payload);
            if (movie) {
                movie.dislikes++;
                const index = state.movies.findIndex((movie) => movie.id === action.payload);
                state.movies[index] = movie;
                state.votes.push(movie.id)
            }
        },
        deleteMovie: (state, action: PayloadAction<string>) => {
            state.movies = state.movies.filter((movie) => movie.id !== action.payload);
            state.categories = Array.from(new Set(state.movies.map((movie) => movie.category)));
        },
        filterMovies: (state, action: PayloadAction<string>) => {
            const index = state.selectedCategories.indexOf(action.payload);
            if (index > -1) {
                state.selectedCategories.splice(index, 1);
            } else {
                state.selectedCategories.push(action.payload);
            }

            if (state.selectedCategories.length === state.categories.length) {
                state.selectedCategories = [];
            }
        },
        clearSelectedCategories: (state) => {
            state.selectedCategories = [];
        },
        previousPage: (state) => {
            if (state.pagination.currentPage === 1) {
                state.pagination.currentPage = state.pagination.totalPages;
            } else {
                state.pagination.currentPage--;
            }
        },
        nextPage: (state) => {
            if (state.pagination.currentPage === state.pagination.totalPages) {
                state.pagination.currentPage = 1;
            } else {
                state.pagination.currentPage++;
            }
        },
        updatePaginationItemsPerPage: (state, action: PayloadAction<string>) => {
            const newItemsPerPage = parseInt(action.payload);
            const totalPages = Math.ceil(state.pagination.totalItems / newItemsPerPage);

            state.pagination.itemsPerPage = newItemsPerPage;
            state.pagination.totalPages = totalPages;
            state.pagination.currentPage = 1;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMovies.fulfilled, (state, action:PayloadAction<{ movies: MovieType[]; categories: string[]; totalItems: number }>) => {
                state.status = 'succeeded';
                state.movies = action.payload.movies as MovieType[];
                state.allMovies = action.payload.movies as MovieType[];
                state.categories = action.payload.categories as string[];
                state.pagination.totalItems = action.payload.totalItems as number;
                state.pagination.totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
            });
    },
});

export const store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
    },
});

export const {
    likeMovie,
    dislikeMovie,
    deleteMovie,
    filterMovies,
    clearSelectedCategories,
    previousPage,
    nextPage,
    updatePaginationItemsPerPage,
} = movieSlice.actions;
