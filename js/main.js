// fetching all data using search text//
const loadBooks = () => {
  const inputField = document.getElementById('input-field');
  const searchText = inputField.value;
  if(searchText){
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
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
    p.innerText = `-----Showing ${books.docs.length} results of ${books.numFound} Books-----`;
    books.docs.forEach(book => {
      // if author name property is not in the object //
      if(book.author_name === undefined){
        //do nothing
      } 
      // if publisher property is not in the object //
      else if(book.publisher === undefined){
        //do nothing
      }
      // creating div to show in webpage //
      else{
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
              <h5 class="card-title">${book.text[2][0]==='O'?book.text[1]:book.text[2]}</h5>
              <h6 class="card-title">By ${book.author_name[0]}</h6>
              <p class="card-text">Publisher : ${book.publisher[0]}</p>
              <p class="card-text">First Publish Year : ${book.first_publish_year===undefined?'Unknown':book.first_publish_year}</p>
              <button class="btn btn-outline-info">Add to cart</button>
            </div>
          </div>
        </div>
        </div>
        `;
        containerDiv.appendChild(div);
      }
    })
  }
}
// handling all the errors using a function //
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