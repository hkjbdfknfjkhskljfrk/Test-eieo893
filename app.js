const navbar = document.getElementById("navbar");  
const content = document.getElementById("content"); 



async function showAuthors() {
    const authorData = await fetch("/forfattere");
    const authors = await authorData.json();

    for (const author of authors) {
        const authorItem = document.createElement("li");
        authorItem.textContent = author.author;
        authorItem.addEventListener("click", () => {
            showAuthorInfo(author.id);
        });

        navbar.appendChild(authorItem);
    }
}

async function showAuthorInfo(authorId) {
    const authorData = await fetch(`/forfattere/${authorId}`);
    const authorInfo = await authorData.json();

    const authorContent = document.createElement("div");
    authorContent.innerHTML = `
        <h2>${authorInfo.author}</h2>
        <p>Birthdate: ${authorInfo.birthdate}</p>
        <img src="img/authors/${authorInfo.img}" alt="${authorInfo.author}">
    `;

    const authorBooks = await fetch(`/forfatterBoker/${authorId}`);
    const books = await authorBooks.json();

    const booksList = document.createElement("ul");
    books.forEach(book => {
        const bookItem = document.createElement("li");
        bookItem.textContent = book.name;
        bookItem.addEventListener("click", () => {
            showBookInfo(book.id);
        });

        booksList.appendChild(bookItem);
    });

    authorContent.appendChild(booksList);
    content.innerHTML = "";
    content.appendChild(authorContent);
}

async function showBookInfo(bookId) {
    const bookData = await fetch(`/boker/${bookId}`);
    const bookInfo = await bookData.json();

    const bookContent = document.createElement("div");
    bookContent.innerHTML = `
        <h2>${bookInfo.name}</h2>
        <p>Author: ${bookInfo.author}</p>
        <p>Pages: ${bookInfo.pages}</p>
        <p>Summary: ${bookInfo.summary}</p>
        <img src="img/books/${bookInfo.img}" alt="${bookInfo.name}">
    `;

    const blurbsData = await fetch(`/blurbs/${bookId}`);
    const blurbs = await blurbsData.json();

    const blurbsList = document.createElement("ul");
    blurbs.forEach(blurb => {
        const blurbItem = document.createElement("li");
        blurbItem.textContent = `${blurb.author}: ${blurb.blurb}`;
        blurbsList.appendChild(blurbItem);
    });

    bookContent.appendChild(blurbsList);
    content.innerHTML = "";
    content.appendChild(bookContent);
}

async function showBooksByGenre(genre) {
    const data = await fetch(`/booksByGenre/${genre}`);
    const books = await data.json();
    content.innerHTML = "";

    for (const book of books) {
        const bookElement = document.createElement("div");
        bookElement.innerHTML = `
            <img src="img/books/${book.img}" class="bok" alt="${book.name}">
            <p>${book.name}</p>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.summary}</p>
        `;
        content.appendChild(bookElement);
    }
}

showAuthors();