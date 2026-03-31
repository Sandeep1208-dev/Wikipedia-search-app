let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendResults(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultContainerEl = document.createElement("div");
    resultContainerEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultContainerEl.appendChild(titleEl);

    let titleBreak = document.createElement("br");
    resultContainerEl.appendChild(titleBreak);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultContainerEl.appendChild(urlEl);

    let lineBreak = document.createElement("br");
    resultContainerEl.appendChild(lineBreak);

    let descreptionEl = document.createElement("p");
    descreptionEl.classList.add("link-description");
    descreptionEl.textContent = description;
    resultContainerEl.appendChild(descreptionEl);

    searchResultsEl.appendChild(resultContainerEl);

}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppendResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);
