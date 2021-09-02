// Search Field Handle
const searchField = document.getElementById('search-field');
const textContent = document.getElementById('text-content');

// Search and Load Book Function
const searchBook = () => {
    const searchText = searchField.value;
    searchField.value = '';
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.numFound === 0) {
                searchNumber.innerText = '0';
                const div = document.createElement('div');
                div.classList = "w-50 mx-auto bg-danger border border-primary mt-5 p-4";
                div.innerHTML = `<h4 class="text-center text-white">No Data Found...</h4>`;
                textContent.appendChild(div);
            }
            else {
                searchNumber.innerText = data.numFound;
                displayBook(data.docs);
            }
        });
}

// Book Container Handle
const bookContainer = document.getElementById('book-container');
const searchNumber = document.getElementById('search-number');
const resultShowText = document.getElementById('result-show-text');

// Display Books Function
const displayBook = (books) => {
    searchNumber.innerText = books.length;
    // clear previouus data
    bookContainer.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card bg-light h-100">
            <div class="card-header">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title text-center">${book.title}</h5>
                <p class="card-text text-center">Author name: ${book.author_name}</p>
                <p class="card-text text-center">First Publish: ${book.first_publish_year}</p>
                <p class="card-text text-center">Publisher: ${book.publisher}</p>
            </div>
        </div>
        `;
        bookContainer.appendChild(div);
    });
}
