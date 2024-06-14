import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getMovies, RootStateType} from "@/redux.ts";
import CategoriesSelect from "@/components/CategoriesSelect.tsx";
import Filmography from "@/components/Filmography.tsx";

function App() {
    const dispatch = useDispatch();
    const selectedCategories: string[] = useSelector((state:RootStateType) => state.movies.selectedCategories);
    const status: string = useSelector((state: RootStateType) => state.movies.status);

    useEffect(() => {
        // @ts-ignore
        dispatch(getMovies(selectedCategories));
    }, [dispatch, selectedCategories]);

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-6 gap-5">
            {status === 'loading' && <p>Chargement des films...</p>}
            {status === 'succeeded' && (
                <>
                    <CategoriesSelect/>
                    <Filmography />
                </>
            )}
        </div>
    )
}

export default App