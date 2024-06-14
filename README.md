# react-interview

1. Lister les films dans des cartes avec: le titre en gras, la catégorie et une jauge type Youtube indiquant le ratio likes/dislikes. Les cartes doivent être côtes à côtes et responsive. Càd que lorsque la fenêtre se réduit, les cartes sautent à la ligne suivante.

2. Ajouter un bouton dans les cartes permettant de supprimer celle-ci

3. Ajouter un bouton toggle like/dislike

4. Ajouter un filtre par catégorie (de type multiselect) en supposant qu'on ne les connaisse pas à l'avance (il faut donc les récupérer dynamiquement depuis les films). Si tous les films d'une catégorie sont supprimés, celle-ci ne doit plus apparaître.

5. Ajouter un système de pagination avec les fonctionnalités suivantes:
  * Boutons précédent/suivant
  * Choix du nombre d'élements affichés par page (4, 8 ou 12).

Prenez des initiatives, il y a des points bonus si

* C'est joli
* Vous utilisez correctement REDUX
* Il y a une attention aux détails

/!\ La suppression du comportement asynchrone dans `movies.js` entraînera une annulation du test.

## Rendu

### React + TypeScript + Vite
Utilisation de Vite pour la rapidité de build et de TypeScript pour la robustesse du code. 

J'ai vraiment hésité à utiliser Next.js pour la facilité de développement, mais j'ai préféré rester sur Vite pour montrer que je sais l'utiliser.

### Redux Toolkit
Utilisation de Redux Toolkit pour la gestion de l'état global de l'application. 

Même si cela peut paraître overkill pour une petite application, cela permet de montrer que je sais l'utiliser.

### Style

 - J'ai utilisé [Tailwind CSS](https://tailwindcss.com/) pour le style de l'application. J'ai essayé de faire quelque chose de joli et responsive 
 - J'ai utilisé la bibliothèque [Shadcn/ui](https://ui.shadcn.com/) pour les composants.
 - J'ai utilisé la librairie [Lucide-react](https://lucide.dev/icons/) pour les icones.
 - J'ai récupéré votre [Favicon](https://www.particeep.com/wp-content/favicon/favicon.ico) pour l'ajouter à l'application.
 - J'ai récupéré le bleu et le rouge de votre charte graphique pour les couleurs des boutons et des icones.

### Scripts

Lance l'application en mode développement :
 ```bash
 pnpm run dev
 ```

Lance l'application en mode production :
 ```bash
pnpm run build
```


    
 

