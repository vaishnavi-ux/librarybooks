let currentPage = 1;
let currentQuery = "";
let cachedResults = {};

function searchBooks() {
    const searchBox = document.getElementById("search-box");
    const query = searchBox.value.trim();
    currentQuery = query;
    currentPage = 1;
    const resultsList = document.getElementById("results-list");
    const resultsHeading = document.getElementById("results-heading");
    
    // Clear any previous search results
    while (resultsList.firstChild) {
      resultsList.removeChild(resultsList.firstChild);
    }
    
    // Make API request to search for books by title or author
    const searchUrl = `https://openlibrary.org/search.json?q=${query}&limit=10&offset=${(currentPage - 1) * 10}`;
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        resultsHeading.textContent = `Search Results for "${query}":`;
        data.docs.forEach(book => {
          const li = document.createElement("li");
          const title = book.title || "Unknown Title";
          const author = book.author_name ? book.author_name[0] : "Unknown Author";
          const link = `https://openlibrary.org/books/${book.key}`;
          li.innerHTML = `<a href="${link}">${title} by ${author}</a>`;
          resultsList.appendChild(li);
        });
      })
      .catch(error => console.error(error));
      
    // Make API request to fetch top 10 books for the given subject
    const subjectUrl = `https://openlibrary.org/subjects/${query}.json?limit=10`;
    fetch(subjectUrl)
      .then(response => response.json())
      .then(data => {
        const subjectBooksList = document.getElementById("subject-books-list");
        subjectBooksList.innerHTML = "";
        const subjectHeading = document.getElementById("subject-heading");
        subjectHeading.textContent = `Top Books for "${query}":`;
        data.works.forEach(work => {
          const li = document.createElement("li");
          const title = work.title || "Unknown Title";
          const author = work.authors ? work.authors[0].name : "Unknown Author";
          const link = `https://openlibrary.org/books/${work.key}`;
          li.innerHTML = `<a href="${link}">${title} by ${author}</a>`;
          subjectBooksList.appendChild(li);
        });
      })
      .catch(error => console.error(error));
  }
  

function displayResults(data) {
  const resultsList = document.getElementById("results-list");
  const resultsHeading = document.getElementById("results-heading");
  resultsHeading.textContent = `Search Results for "${currentQuery}":`;
  data.docs.forEach(book => {
    const li = document.createElement("li");
    const title = book.title || "Unknown Title";
    const author = book.author_name ? book.author_name[0] : "Unknown Author";
    const link = `https://openlibrary.org/books/${book.key}`;
    li.innerHTML = `<a href="${link}">${title} by ${author}</a>`;
    resultsList.appendChild(li);
  });
}

function clearSearch() {
  const searchBox = document.getElementById("search-box");
  searchBox.value = "";
  currentQuery = "";
  currentPage = 1;
  const resultsList = document.getElementById("results-list");
  const resultsHeading = document.getElementById("results-heading");
  while (resultsList.firstChild) {
    resultsList.removeChild(resultsList.firstChild);
  }
  resultsHeading.textContent = "Search Results:";
}

function nextPage() {
  currentPage++;
  searchBooks();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    searchBooks();
  }
}

function getBooksBySubject() {
    const subject = document.getElementById('subject').value;
    const url = `https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json?limit=10`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const books = data.works.map(work => ({
          title: work.title,
          author: work.authors ? work.authors[0].name : 'Unknown'
        }));
  
        // display the books on a new page
        // ...
      });
  }
  

function searchBySubject() {
  const subjectInput = document.getElementById("subject-input");
  const subject = subjectInput.value.trim();
  if (subject !== "") {
    const apiUrl = `https://openlibrary.org/subjects/${subject}.json?limit=10`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const resultsList = document.getElementById("results-list");
        const resultsHeading = document.getElementById("results-heading");
        // Clear any previous search results
        while (resultsList.firstChild) {
          resultsList.removeChild(resultsList.firstChild);
        }
        resultsHeading.textContent = `Top 10 Books on ${subject}:`;
        data.works.forEach(work => {
          const li = document.createElement("li");
          const title = work.title || "Unknown Title";
          const author = work.authors[0].name || "Unknown Author";
          const link = `https://openlibrary.org${work.key}`;
          li.innerHTML = `<a href="${link}">${title} by ${author}</a>`;
          resultsList.appendChild(li);
        });
      })
      .catch(error => console.error(error));
  }
}
