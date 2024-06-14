import {Button} from "@/components/ui/button.tsx";
import {clearSelectedCategories, filterMovies, RootStateType} from "@/redux.ts";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "@/components/Pagination.tsx";

export default function CategoriesSelect() {

    const categories: string[] = useSelector((state: RootStateType) => state.movies.categories);
    const selectedCategories: string[] = useSelector((state: RootStateType) => state.movies.selectedCategories);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-5 w-full md:w-48 md:fixed text-particeep-blue">
            <h1 className="text-3xl font-bold">Catégories</h1>
            <div className="flex flex-col gap-5">
                <Button variant={`${selectedCategories.length === 0 ? "default" : "outline"}`}
                        onClick={() => dispatch(clearSelectedCategories())}>All categories</Button>
                {categories.map((category) => {
                    return (
                        <Button key={category}
                                variant={`${selectedCategories.includes(category) ? "default" : "outline"}`}
                                onClick={() => dispatch(filterMovies(category))}>
                            {category}
                        </Button>
                    )
                })}
                <Pagination/>
            </div>
        </div>
    )
}