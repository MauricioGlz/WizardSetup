function makeImport () {

    //Table template
    let templateImport = document.getElementById("makeImport-table-container");

    let tableContentsImport = [
        {
            evaluated: "Juan Andrés González Gordillo",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 3",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 4",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 5",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 6",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 7",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 8",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 9",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 10",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 11",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 12",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 13",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"

        },
        {
            evaluated: "Mauricio González Gordillo 14",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 15",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 16",
            email: "mauricio@potentor.com.mx",
            date: "20-10-2020",
            position: "Frontend leader"
        }
    ];


    //Pagination
    function paginationImport (tableContent) {
        let pagesImport = tableContent.length / 8;
        let pagesImportContainer = document.getElementById("makeImport-pagination-container");

        pagesImportContainer.innerHTML = "";

        for (let i = 0; i < pagesImport; i++) {

            if(i === 0) {
                pagesImportContainer.innerHTML +=
                    `<button class="option-btn import-page active">${i+1}</button>`;
            } else {
                pagesImportContainer.innerHTML +=
                    `<button class="option-btn import-page">${i+1}</button>`
            }
        };

        let pagesImportBtns = document.querySelectorAll(".import-page");

        pagesImportBtns.forEach((pagesImport, i) => {
            pagesImport.addEventListener("click", () => {

                pagesImport.classList.add("active");

                if (pagesImport.className == "option-btn import-page active") {

                    pagesImportBtns.forEach((pagesImport1) =>  {
                        pagesImport1.classList.remove("active");
                    });
                    pagesImport.classList.add("active");

                    templateImport.innerHTML = " ";

                    loadTableContentImport(i);

                    let importCheckGeneral = document.getElementById("checkImport");
                    importCheckGeneral.checked = false;
                }
            });
        });
    }
    paginationImport(tableContentsImport);

    // Select inputs
    function selectInputsImport() {
        let importCheckInputs = document.querySelectorAll(".check-import");
        let importCheckGeneral = document.getElementById("checkImport");

        importCheckGeneral.addEventListener("click", () => {

            if(importCheckGeneral.checked) {
                importCheckInputs.forEach((checks) => {
                    checks.checked = true;
                });
            } else {
                importCheckInputs.forEach((checks) => {
                    checks.checked = false;
            });

            }
        });
    }
    selectInputsImport();

    //Load Page
    function chunckArrayInGroupsImport(arr, size) {
        var chunk = [], i;

        for (i = 0; i <= arr.length; i+= size) {
            chunk.push(arr.slice(i, i + size));
        }

        return chunk;
    }
    let chunkArrayTableContentsImport = chunckArrayInGroupsImport(tableContentsImport, 8);



    function loadTableContentImport(i) {
        chunkArrayTableContentsImport[i].forEach((content) => {
            templateImport.innerHTML += `
                <tr>
                    <td>${content.evaluated}</td>
                    <td>${content.email}</td>
                    <td>${content.date}</td>
                    <td>${content.position}</td>
                    <td>
                        <label class="switch">
                            <input class="check-import" type="checkbox" name="questionVisible">
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>`;
        });
        selectInputsImport()
    }
    loadTableContentImport(0);

    //Search Filter
    let makeImportInput = document.getElementById("makeImportSearch");

    makeImportInput.addEventListener("keyup", () => {

        let filterImport = tableContentsImport.filter((content) => {
            return makeImportInput.value.toUpperCase() == content.evaluated.toUpperCase();
        });


        templateImport.innerHTML = "";
        let chunkfilterImport = chunckArrayInGroupsImport(filterImport, 8);

        function loadImportFilter(i) {
            chunkfilterImport[i].forEach((content) => {
                templateImport.innerHTML += `
                    <tr>
                        <td>${content.evaluated}</td>
                        <td>${content.email}</td>
                        <td>${content.date}</td>
                        <td>${content.position}</td>
                        <td>
                            <label class="switch">
                                <input class="check-import" type="checkbox" name="questionVisible">
                                <span class="slider round"></span>
                            </label>
                        </td>
                    </tr>`;
            })
            selectInputsImport()
        }

        paginationImport(filterImport);
        loadImportFilter(0);
        if(!makeImportInput.value) {
            makeImport();
        }
    })


}

export { makeImport }