import {MovieType} from "@/lib/types.ts";

const movies: MovieType[] = [
    {
        id: '1',
        title: 'Oceans 8',
        category: 'Comedy',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9fxmD5um8kqj3lCV3TBVKJqRB4P.jpg",
        likes: 4,
        dislikes: 1
    }, {
        id: '2',
        title: 'Midnight Sun',
        category: 'Comedy',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1TH4PwfcRPenIxce3BREDIV4mBd.jpg",
        likes: 2,
        dislikes: 0
    }, {
        id: '3',
        title: 'Les indestructibles 2',
        category: 'Animation',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/76esVmxYzzHcfyZFAxiWgskVhZv.jpg",
        likes: 3,
        dislikes: 1
    }, {
        id: '4',
        title: 'Sans un bruit',
        category: 'Thriller',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4cvbbExWYVo2PFG9DqdurBBOY1a.jpg",
        likes: 6,
        dislikes: 6
    }, {
        id: '5',
        title: 'Creed II',
        category: 'Drame',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xJVwvbQUDzmYtVvmXDknRhsTTTu.jpg",
        likes: 16,
        dislikes: 2
    }, {
        id: '6',
        title: 'Pulp Fiction',
        category: 'Thriller',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4TBdF7nFw2aKNM0gPOlDNq3v3se.jpg",
        likes: 11,
        dislikes: 3
    }, {
        id: '7',
        title: 'Pulp Fiction',
        category: 'Thriller',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4TBdF7nFw2aKNM0gPOlDNq3v3se.jpg",
        likes: 12333,
        dislikes: 32
    }, {
        id: '8',
        title: 'Seven',
        category: 'Thriller',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/h4X4tJFxJobAImCMekVZXUpJVJC.jpg",
        likes: 2,
        dislikes: 1
    }, {
        id: '9',
        title: 'Inception',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg",
        category: 'Thriller',
        likes: 2,
        dislikes: 1
    }, {
        id: '10',
        title: 'Gone Girl',
        category: 'Thriller',
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7xkJ1ACu40BjzLHVPRILWjFvW7.jpg",
        likes: 22,
        dislikes: 12
    },
]

// @ts-ignore
export const movies$ = new Promise((resolve, reject) => setTimeout(resolve, 100, movies))