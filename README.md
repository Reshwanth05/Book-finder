Book Finder

Book Finder is a web application built with React and Vite that helps users search for books by title or author, filter them by genre, view the last searched query, and manage a favorites list. The project was developed from scratch, with custom styling and routing, and deployed on GitHub.

Development Process

1. Project Setup
   I started by creating a new project using Vite with the React template:
```
npm create vite@latest book-finder
cd book-finder
npm install
```
I then cleaned up boilerplate files like App.jsx, App.css, and index.css to prepare for custom development.

2. Installed Required Libraries
   To handle navigation, I installed React Router DOM:
```
npm install react-router-dom
```
React and React DOM were already included by Vite. I also added ESLint and plugins for code quality, configured in eslint.config.js.

3. Core Features Developed

Search Form
I implemented a search form where users can enter a book title or author. When submitted, the app fetches results from the Open Library API ([https://openlibrary.org/search.json](https://openlibrary.org/search.json)). The last search term is displayed so users always know what they searched for.

Genre Selection
A dropdown menu was added for selecting a genre such as Fiction, Science, or Romance. Results can be filtered to show books matching the chosen category.

Favorites Management
Each book result has an "Add to Favorites" button. Clicking it adds the book to the user’s favorites list, which is stored either in local state or localStorage. On the Favorites page, users can also remove books easily.

Responsive UI
The app was styled with CSS for a clean and modern look. I included a Navbar, Footer, Book Grid, and Suggestions component to provide a better user experience.

Running the Project

Clone and install dependencies:

```
git clone https://github.com/your-username/book-finder.git
cd book-finder
npm install
```

Start the development server:

```
npm run dev
```
The app will run locally at [http://localhost:5173](http://localhost:5173)

Build for production:
```
npm run build
npm run preview
```

Features Overview
* Search books by title or author
* Display the last search term above the results
* Filter by genre using a dropdown menu
* Add or remove favorites for quick access
* Navigate between Home, Favorites, and Search pages with React Router
* Deployed on GitHub for version control and hosting

Deployment on GitHub
I initialized git and committed the project with the following commands:

```
git init
git add .
git commit -m "Initial commit - Book Finder app"
git branch -M main
git remote add origin https://github.com/your-username/book-finder.git
git push -u origin main
```
The repository is now live on GitHub. For hosting, this project can be deployed on GitHub.

Live Demo
Deployed on CodeSandBox https://codesandbox.io/p/github/Reshwanth05/Book-finder/draft/bold-jepsen?workspaceId=ws_XvdCXJUucg4HjPrHb5BECw

also deployed in Stackblitz https://stackblitz.com/~/github.com/Reshwanth05/Book-finder



