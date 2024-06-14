import {MovieType} from "@/lib/types.ts";
import {ThumbsDownIcon, ThumbsUpIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {dislikeMovie, likeMovie} from "@/redux.ts";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress"
import DeleteAlert from "@/components/DeleteAlert.tsx";


interface MovieCardProps {
    movie: MovieType
}

export default function MovieCard({movie}: MovieCardProps) {

    const dispatch = useDispatch();
    const votes = useSelector((state: any) => state.movies.votes);

    const [progressRatio, setProgressRatio] = useState<number>(0)

    useEffect(() => {

        if (movie.likes + movie.dislikes === 0) {
            setProgressRatio(0)
            return
        }

        setProgressRatio((movie.likes / (movie.likes + movie.dislikes)) * 100)
    }, [movie]);

    return (
        <Card className="w-full mx-auto relative movie">
            <CardHeader>
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <CardTitle className="font-bold text-particeep-blue">{movie.title}</CardTitle>
                        <CardDescription className="text-particeep-blue">{movie.category}</CardDescription>
                    </div>
                    <DeleteAlert movie={movie}/>
                </div>


            </CardHeader>
            <CardContent>
                {movie.img && <img src={movie.img} alt={`Affiche du film ${movie.title}`}/>}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <div className="flex flex-row-reverse">
                    <Button
                        variant={"outline"}
                        className="flex gap-2 border-l-0 rounded-l-none text-particeep-red"
                        onClick={() => dispatch(dislikeMovie(movie.id))}
                        disabled={votes.includes(movie.id)}
                    >
                        <ThumbsDownIcon size={24}/>
                        <span>{movie.dislikes}</span>
                    </Button>
                    <Button
                        variant={"outline"}
                        className="flex gap-2 border-r-0 rounded-r-none text-particeep-blue"
                        onClick={() => dispatch(likeMovie(movie.id))}
                        disabled={votes.includes(movie.id)}
                    >
                        <ThumbsUpIcon size={24}/>
                        <span>{movie.likes}</span>
                    </Button>
                </div>
                <div className="flex flex-col w-full justify-center items-center">
                    <Progress value={progressRatio} className="bg-particeep-red"/>
                </div>
            </CardFooter>
        </Card>

    )
}