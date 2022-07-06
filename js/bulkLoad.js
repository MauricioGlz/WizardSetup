function bulkLoad () {

    //Table template
    let templateBulk = document.getElementById("bulkLoad-table-container");
    let tableContents = [
        {
            evaluated: "Mauricio Andrés González Gordillo 1",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 2",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 3",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 4",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 5",
            evaluators : "Jose Aureoles"
        },
                {
            evaluated: "Mauricio Andrés González Gordillo 6",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 7",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 8",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 9",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 10",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 11",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 12",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 13",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 14",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 15",
            evaluators : "Jose Aureoles"
        },
        {
            evaluated: "Mauricio González Gordillo 16",
            evaluators : "Jose Aureoles"
        }
    ]


    //Pagination

    let pagesBulk = tableContents.length / 5;
    let pagesBulkContainer = document.getElementById("bulkLoad-pagination-container");

    for (let i = 0; i < pagesBulk; i++) {

        if(i === 0)
        pagesBulkContainer.innerHTML +=
        `
            <button class="option-btn bulkLoad-page active">${i+1}</button>
        `
        else {
        pagesBulkContainer.innerHTML +=
            `
            <button class="option-btn bulkLoad-page">${i+1}</button>
            `
        }
    }

    let pagesBulkBtns = document.querySelectorAll(".bulkLoad-page");

    pagesBulkBtns.forEach((pageBulk, i) => {
        pageBulk.addEventListener("click", () => {
            pageBulk.classList.add("active");
            if (pageBulk.className == "option-btn bulkLoad-page active") {
                pagesBulkBtns.forEach((pageBulk1) =>  {
                    pageBulk1.classList.remove("active");
                })
                pageBulk.classList.add("active");
                templateBulk.innerHTML = " "
                loadTableContent(i);
                let bulkCheckGeneral = document.getElementById("checkBulk");
                bulkCheckGeneral.checked = false;
            }
        })
    })

    //Load Page
    function chunckArrayInGroups(arr, size) {
        var chunk = [], i;
        for (i = 0; i <= arr.length; i+= size)
            chunk.push(arr.slice(i, i + size));
        return chunk;
    }

    let chunkArrayTableContents = chunckArrayInGroups(tableContents, 5);


    function loadTableContent(i) {
        chunkArrayTableContents[i].forEach((content) => {
            templateBulk.innerHTML += `
                <tr>
                    <td>${content.evaluated}</td>
                    <td>${content.evaluators}</td>
                    <td>
                        <label class="switch">
                            <input class="check-bulk" type="checkbox" name="questionVisible">
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>
            `

        // Select inputs
        let bulkCheckInputs = document.querySelectorAll(".check-bulk");
        let bulkCheckGeneral = document.getElementById("checkBulk");

        bulkCheckGeneral.addEventListener("click", () => {
            if(bulkCheckGeneral.checked) {
                bulkCheckInputs.forEach((checks) => {
                    checks.checked = true;
                })
            }
            else {
                bulkCheckInputs.forEach((checks) => {
                    checks.checked = false;
                })
            }
            });
        });
    }

    loadTableContent(0);




}
export { bulkLoad }