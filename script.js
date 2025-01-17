const accessKey = "d7iDWDP62sbc4vbXXYnviKIzZGHiGfQoTsRd2XPa7XQ";
const searchForm = document.querySelector("form");
const searchBox = document.getElementById("search-box");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more");


let keyword = "";
let page = 1;

async function searchImages() {
    keyword  = searchBox.value;
    if(keyword .trim()){
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
  
      const response = await fetch(url);
      const data = await response.json();
      if (page === 1) {
        searchResults.innerHTML = "";
      }
  
      const results = data.results;
  
      results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
  
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
      });
  
      page++;
  
      if (page > 1) {
        showMoreButton.style.display = "block";
      }
    }
  }
  
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
  });
  
  showMoreButton.addEventListener("click", () => {
    searchImages();
  });