
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSideBar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
    
    closeAllSubMenus();
}

function toggleSubMenu(button) {
    
    if(!button.nextElementSibling.classList.contains('show')) {
        closeAllSubMenus();
    }
    
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');
    
    if(sidebar.classList.contains('close')) {
        sidebar.classList.toggle('rotate');
        toggleButton.classList.toggle('rotate');
    }
    
}

function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.remove('rotate');
    })
}

//cards

document.addEventListener("DOMContentLoaded", function() {
    let booksData = [];

    displayPlaceholderBooks();

    setTimeout(() => {
        fetch("book.json")
        .then(response => response.json())
        .then(data => {
            booksData = data;
            displayBooks(booksData);
        })
        .catch(error => console.error("Error loading books: ", error));
    }, 1000);
    
    document.getElementById("searchInput").addEventListener("input", function() {
        filterBooks(booksData);
    });
});

function displayPlaceholderBooks() {
    const bookContainer = document.getElementById("book-container");
    bookContainer.innerHTML = "";
    
    for(let i = 0; i < 3; i++) {
        const categorySection = document.createElement("div");
        categorySection.classList.add("mb-5");
        
        categorySection.innerHTML = `<h2 class="placeholder-glow">
                <span class="placeholder col-4" style="border-radius: 10px"></span>
            </h2>`;
        
        const row = document.createElement("div");
        row.classList.add("row", "flex-nowrap");
        
        for (let j = 0; j < 4; j++) {
            const col = document.createElement("div");
            col.classList.add("col-md-3", "col-6");
            
            col.innerHTML = `
                <div class="card h-100 shadow" aria-hidden="true">
                    <div class="placeholder-wave">
                            <div class="placeholder" style="width: 100%; height: 300px; background-color: #e0e0e0;"></div>                        <div class="card-body">
                            <h5 class="card-title placeholder col-6"></h5>
                            <p class="card-text placeholder col-7"></p>
                            <p class="card-text placeholder col-5"></p>
                            <p class="card-text placeholder col-8"></p>
                        </div>
                    </div>
                </div>
            `;
            
            row.appendChild(col);
        }
        
        categorySection.appendChild(row);
        bookContainer.appendChild(categorySection);
    }
}


function displayBooks(books) {
    const bookContainer = document.getElementById("book-container");
    bookContainer.innerHTML = "";
    
    const years = {};
    books.forEach(book => {
        const year = book.published_year || "Uncategorized";
        if (!years[year]) {
            years[year] = [];
        }
        years[year].push(book);
    });
    
    for (const year in years) {
        if(year > 1980) {
            
            const shuffledBooks = years[year]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
            
            const categorySection = document.createElement("div");
            categorySection.classList.add("mb-5");
            categorySection.innerHTML = `<h2>${year}</h2>`;
            
            const row = document.createElement("div");
            row.classList.add("row", "flex-nowrap");
            
            shuffledBooks.forEach(book => {
                const col = document.createElement("div");
                col.classList.add("col-md-3", "col-6");
                
                col.innerHTML = `
                    <div class="card h-100 shadow">
                        <img src="${book.thumbnail}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text d-none d-md-block"><strong>Author:</strong> ${book.authors}</p>
                            <p class="card-text d-none d-md-block"><strong>Published:</strong> ${book.published_year}</p>
                            <p class="card-text">${book.description.substring(0, 100)}...</p>
                        </div>
                    </div>
                `;
                
                row.appendChild(col);
            });
            categorySection.appendChild(row);
            bookContainer.appendChild(categorySection);
        }
        
    }
}

//search box
function filterBooks(booksData) {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!query) {
        displayBooks(booksData);
        return;
    }

    
    const filteredBooks = booksData.filter(book => {
        
        if (!isNaN(query)) {
            return book.published_year && book.published_year.toString() === query;
        }
        else {
            return (book.title && typeof book.title === "string" && book.title.toLowerCase().includes(query)) ||
                   (book.authors && typeof book.authors === "string" && book.authors.toLowerCase().includes(query));
        }
    });
    
    displayBooks(filteredBooks);
}
