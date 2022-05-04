console.log("Welcome to Words API");

let searchBtn = document.getElementById("searchButton");

searchBtn.addEventListener("click", defFetcher);

function defFetcher() {

    let searchWord = document.getElementById("searchWord");

    let xhr = new XMLHttpRequest();

    xhr.open("GET", `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord.value.toLowerCase()}`, true);

    // xhr.onprogress = function () {
    //     console.log("Fetching data is in progress");
    // }

    xhr.onload = function () {
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            // let html = "";
            let html = `<h5 id="wordTitle" class="card-title">"${searchWord.value}"</h5>`;
            obj.forEach(function(element) {
                if (element["word"]==searchWord.value.toLowerCase()){
                
                for (let i = 0; i < element["meanings"].length; i++) {
                    html += `
                        <li>${element["meanings"][i]["definitions"][0]["definition"]}</li>
                    `;
                }
                }
                let defList = document.getElementById("definitionsList");
                defList.innerHTML = html;
                searchWord.value = "";
                document.getElementById("card-body").removeChild(searchBtn);
                document.getElementById("card-body").removeChild(searchWord);
                let closeButton = document.createElement('button');
                closeButton.id = "closeBtn";
                closeButton.className = "btn btn-primary";
                closeButton.innerText = `Search another word`;
                document.getElementById("card-body").appendChild(closeButton);
                let closeBtn = document.getElementById("closeBtn");
                closeBtn.addEventListener("click", function () {
                    document.getElementById("card-body").removeChild(closeBtn);
                    defList.innerHTML = "";
                    document.getElementById("card-body").insertBefore(searchBtn, defList);
                    document.getElementById("card-body").insertBefore(searchWord, searchBtn);
                });
            });
        }
        else {
            alert("Word not found");
        }
    }

    xhr.send();
}

