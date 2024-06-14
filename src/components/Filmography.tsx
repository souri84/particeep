import MovieCard from "@/components/MovieCard.tsx";
import {MovieType} from "@/lib/types.ts";
import {useSelector} from "react-redux";
import {RootStateType} from "@/redux.ts";

export default function Filmography() {
    const movies: MovieType[] = useSelector((state: RootStateType) => state.movies.movies);
    const pagination = useSelector((state: RootStateType) => state.movies.pagination)

    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    const paginatedMovies = movies.slice(start, end);

    return (
        <div className="flex flex-col max-w-7xl gap-5 md:ml-52">
            <h1 className="text-3xl font-bold text-particeep-blue">Liste des films</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedMovies.map((movie) => (
                    <MovieCard key={`movie-${movie.id}`} movie={movie}/>
                ))}
            </div>
        </div>
    )
}