import {Button} from "@/components/ui/button.tsx";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {nextPage, previousPage, RootStateType, updatePaginationItemsPerPage} from "@/redux.ts";

export default function Pagination() {

    const pagination = useSelector((state:RootStateType) => state.movies.pagination)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-row items-center justify-center text-particeep-blue">
            <Button variant={"outline"} onClick={() => dispatch(previousPage())}><ChevronLeftIcon/></Button>
            <select className="text-center" onChange={(e) => dispatch(updatePaginationItemsPerPage(e.target.value))} value={pagination.itemsPerPage}>
                <option>4</option>
                <option>8</option>
                <option>12</option>
            </select>
            <Button variant={"outline"} onClick={() => dispatch(nextPage())}><ChevronRightIcon/></Button>
        </div>
    )
}