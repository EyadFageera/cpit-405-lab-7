let btnXHR = document.getElementById("xhrSearch");
let btnFetch = document.getElementById('fetchSearch');
let btnFetchAsyncAwait = document.getElementById('fetchAsyncAwaitSearch');
let searchText = document.getElementById("search");
let searchResults = document.getElementById("searchResults");
const url = "https://api.unsplash.com/search/photos";
const Key = "DLJS8CFeoRJHqwRwITB8pAyA8DAZZVeK6-344gaBgw8";

btnXHR.addEventListener("click", function () {
    searchResults.innerHTML = "";
    fetchPhotoAPI_UsingXHR(searchText.value);
});

function fetchPhotoAPI_UsingXHR(searchword) {
    let word = searchword.trim();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            processResponse(JSON.parse(xhr.responseText));
        }
    };
    xhr.open("GET", url + "?query=" + word);
    xhr.setRequestHeader("Authorization", "Client-ID " + Key)
    xhr.send();
}

btnFetch.addEventListener("click", function () {
    searchResults.innerHTML = "";
    fetchPhotoAPI_UsingFetch(searchText.value);
});

function fetchPhotoAPI_UsingFetch(searchword) {
    let word = searchword.trim();
    const queryParam = "query=" + word;
    const requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Client-ID " + Key
        }
    };
    fetch(url + "?" + queryParam, requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then((data) => {
            processResponse(data);
        })
        .catch((e) => {
            console.error(e);
        });
}

btnFetchAsyncAwait.addEventListener("click", function () {
    searchResults.innerHTML = "";
    fetchPhotoAPI_UsingFetchAsyncAwait(searchText.value)
        .catch((e) => {
            console.error(e);
        });
});

async function fetchPhotoAPI_UsingFetchAsyncAwait(searchword) {
    let word = searchword.trim();
    const queryParam = "query=" + word;
    const requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Client-ID " + Key
        }
    };

    try {
        const response = await fetch(url + "?" + queryParam, requestOptions); // Wait until the request completes.
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json(); // Wait until the response completes
        processResponse(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function processResponse(resp) {
    for (let item of resp.results) {
        let imgElement = document.createElement("img");
        imgElement.src = item.urls.small;
        imgElement.alt = item.alt_description;
        searchResults.appendChild(imgElement);
    }
}