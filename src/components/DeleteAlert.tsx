import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {MovieType} from "@/lib/types.ts";
import {deleteMovie} from "@/redux.ts";
import {useDispatch} from "react-redux";

interface DeleteAlertProps {
    movie: MovieType
}
export default function DeleteAlert({movie}: DeleteAlertProps) {

    const dispatch = useDispatch();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <TrashIcon
                    className="w-4 h-4 text-particeep-red cursor-pointer absolut top-2 right-2"
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Êtes vous-sur de vouloir supprimer le film ?</DialogTitle>
                    <DialogDescription>
                        Cette action ne peut être annulée. Cette action supprimera définitivement votre compte
                        et supprimera vos données de nos serveurs.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant="outline">Annuler</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button variant={"destructive"} onClick={() => dispatch(deleteMovie(movie.id))}>Confirmer</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}