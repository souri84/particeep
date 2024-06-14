import {describe, expect, it} from "vitest";
import {render as rtlRender, renderHook} from '@testing-library/react'
import App from '../src/App'
import {Provider, useDispatch, useSelector} from "react-redux";
import {deleteMovie, dislikeMovie, filterMovies, getMovies, likeMovie, RootStateType, store} from "../src/redux";
import {act} from 'react-dom/test-utils';

const wrapper = ({children}) => (
    <Provider store={store}>{children}</Provider>
);

const render = (children) => {
    return (
        rtlRender(
            wrapper({children})
        )
    )
}

describe("Test Movies library", () => {
    it("should render <App />", () => {
        const {container} = render(<App/>)
        expect(container).toBeDefined()
    });

    it("should contain movies", () => {
        const {result} = renderHook(() => useSelector((state: RootStateType) => state.movies.movies), {wrapper});
        expect(result.current.length).toBeGreaterThanOrEqual(10)
    });

    it("should contain categories", () => {
        const {result} = renderHook(() => useSelector((state: RootStateType) => state.movies.categories), {wrapper});
        expect(result.current.length).toBeGreaterThanOrEqual(4)
    });

    it("should contain pagination", () => {
        const {result} = renderHook(() => useSelector((state: RootStateType) => state.movies.pagination), {wrapper});
        expect(result.current.currentPage).toBe(1)
    });

    it("should like a movie", () => {

        const {result: resultInitialMovies} = renderHook(() => useSelector((state: RootStateType) => state.movies.movies), {wrapper});
        const movies = resultInitialMovies.current;
        const movie = movies[0];
        const movieLikes = movie.likes;
        const {result} = renderHook(() => useDispatch(), {wrapper});
        const dispatch = result.current;

        dispatch(likeMovie('1'));

        const {result: resultMovies} = renderHook(() => useSelector((state: RootStateType) => state.movies.movies), {wrapper});
        const moviesR = resultMovies.current;
        const movieR = moviesR[0];
        const movieLikesR = movieR.likes;

        expect(movieLikesR).toBe(movieLikes + 1)
    });

    it("should dislike a movie", () => {

        const {result: resultInitialMovies} = renderHook(() => useSelector((state: RootStateType) => state.movies.movies), {wrapper});
        const movies = resultInitialMovies.current;
        const movie = movies[0];
        const movieDislikes = movie.dislikes;
        const {result} = renderHook(() => useDispatch(), {wrapper});
        const dispatch = result.current;

        dispatch(dislikeMovie('1'));

        const {result: resultMovies} = renderHook(() => useSelector((state: RootStateType) => state.movies.movies), {wrapper});
        const moviesR = resultMovies.current;
        const movieR = moviesR[0];
        const movieDislikesR = movieR.dislikes;

        expect(movieDislikesR).toBe(movieDislikes + 1)
    });

    it('should filter movies', async () => {
        const {result} = renderHook(() => useDispatch(), {wrapper});
        const dispatch = result.current;

        await act(async () => {
            // @ts-ignore
            dispatch(getMovies([]));
        });

        const {result: allMovies} = renderHook(() => useSelector((state: RootStateType) => state.movies.allMovies), {wrapper});
        expect(allMovies.current.length).toBe(10);
        const categories = allMovies.current.map((movie) => movie.category);
        const categoryTest = categories[0];
        const countMovies = allMovies.current.filter((movie) => movie.category === categoryTest).length;

        await act(async () => {
            dispatch(filterMovies(categoryTest));
        });

        const {result: resultMovies} = renderHook(() => useSelector((state: RootStateType) => state.movies.movies), {wrapper});
        expect(resultMovies.current.length).toBe(countMovies);
    });


    it('should remove a movie', async () => {
        const {result} = renderHook(() => useDispatch(), {wrapper});
        const dispatch = result.current;

        // @ts-ignore
        await act(async () => {
            // @ts-ignore
            dispatch(getMovies([]));
        });

        await act(async () => {
            dispatch(deleteMovie('2'));
        });

        const {result: resultMovies} = renderHook(() => useSelector((state: RootStateType) => state.movies.movies), {wrapper});
        expect(resultMovies.current.length).toBe(9);

        await act(async () => {
            dispatch(deleteMovie('9'));
        });

        const {result: resultMovies2} = renderHook(() => useSelector((state: RootStateType) => state.movies.movies), {wrapper});
        expect(resultMovies2.current.length).toBe(8);
    });
});