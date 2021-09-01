// fetching all data using search text//
const loadBooks = () => {
  const inputField = document.getElementById('input-field');
  const searchText = inputField.value;
  if(searchText){
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then(res => res.json())
      .then(data => details(data))
    inputField.value = '';
  }
  else{
    errorHandler('Search Box cannot be empty');
  }
}
// showing all data in webpage //
const details = books => {
  // console.log(books);
  if(books.docs.length === 0){
    errorHandler('No Results Found');
  }
  else{
    const containerDiv = document.getElementById('show-field');
    containerDiv.textContent = '';
    document.getElementById('error').textContent = '';
    const p = document.createElement('p');
    p.classList.add('text-center','fw-lighter','fs-5','mb-4');
    containerDiv.appendChild(p);
    p.innerText = `-----Showing ${books.docs.length} results of ${books.numFound} Books-----`
    books.docs.forEach(book => {
      if(book.author_name === undefined){
        book.author_name = "Unknown";
      }
      const div = document.createElement('div');
      div.classList.add('col-4');
      div.innerHTML = `
      <div class="card mb-3 shadow" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-title">By ${book.author_name}</h6>
              <p class="card-text">Publisher : ${book.publisher}</p>
              <p class="card-text">First Publish Year : ${book.first_publish_year}</p>
              <button class="btn btn-outline-info">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      `;
      containerDiv.appendChild(div);
    })
  }
  
}
const errorHandler = msg => {
  const errorContainer = document.getElementById('error');
    errorContainer.textContent = '';
    document.getElementById('show-field').textContent = '';
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
    <div class="card text-white text-center bg-dark mb-3" style="max-width: 18rem;">
      <div class="card-header">Sorry :(</div>
      <div class="card-body">
        <p class="card-text">${msg}</p>
      </div>
    </div>
    `;
    errorContainer.appendChild(errorDiv);
}
