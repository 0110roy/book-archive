const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container')
const errorDiv = document.getElementById('error');
const spinner = document.getElementById('spiner')


searchBtn.addEventListener('click', () => {
    spinner.classList.remove('d-none')
    const searchText = searchInput.value;
   
    bookContainer.innerHTML = '';
    errorDiv.textContent = '';
    searchInput.value = '';


   
    if (searchText == "") {
        spinner.classList.add('d-none');
        errorDiv.classList.add('bg-danger')
        errorDiv.innerHTML = `<p class="py-2">Please  Enter A Book Name!!</p>`
        return;
    }

   
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data))

})

const showData = data => {
   
    if (data.numFound === 0) {
        spinner.classList.add('d-none');
        errorDiv.innerHTML = `<p class="py-2">No Result's Found</p>`;
        errorDiv.classList.add('bg-danger')

       

    } else {
        errorDiv.textContent = '';
        errorDiv.classList.remove('bg-danger')
    }
    
    const dataArray = data.docs.slice(0, 100);

    
    dataArray.forEach(element => {
        spinner.classList.add('d-none');
       
        const div = document.createElement('div');
        
        div.classList.add('col-md-3', 'col-12');
       
        div.innerHTML = `
        <div class="card h-100 rounded overflow-hidden border p-2">
                <img style="height: 25rem;" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="w-100  border rounded" alt="No Image Found" />
            <div class="card-body">
                <h1 class="fs-4">Title : ${element.title}</h1>
                <p class="fs-5">Author: ${element.author_name[0]}</p>
                <p class="fs-5">Publisher: ${element.publisher[0]}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">First Publish Year: ${element.first_publish_year}</small>
            </div>
        </div>
        `;
      
        bookContainer.appendChild(div);

       

        errorDiv.innerHTML = `<p class="text-white bg-success  py-2">Results Found: ${data.numFound}</p>`;
    });


}