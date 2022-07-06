function organizationChart () {
    let templateOrganization = document.getElementById("organizationChart-table-container");

    let tableOrganization = [
        {
            evaluated: "Juan Andrés González Gordillo",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "12-10-2021",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "02-10-2017",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 3",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "01-10-2010",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 4",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "03-10-2019",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 5",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "07-11-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 6",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "01-10-2021",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 7",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "03-10-2022",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 8",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "10-10-2023",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 9",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "12-10-2024",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 10",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "10-10-2023",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 11",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "10-09-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 12",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "08-10-2025",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio Andrés González Gordillo 13",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "02-10-2024",
            position: "Frontend leader"

        },
        {
            evaluated: "Mauricio González Gordillo 14",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "07-10-2022",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 15",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "07-08-2020",
            position: "Frontend leader"
        },
        {
            evaluated: "Mauricio González Gordillo 16",
            email: "mauricio@potentor.com.mx",
            atributes: "TJ  Lider  ABZ  ART  IOI",
            date: "07-12-2020",
            position: "Frontend leader"
        }
    ];

    //Pagination
    function paginationOrganization (tableContent) {
        let pagesOrganization = tableContent.length / 8;
        let pagesOrganizationContainer = document.getElementById("organizationChart-pagination-container");

        pagesOrganizationContainer.innerHTML = "";

        for (let i = 0; i < pagesOrganization; i++) {

            if(i === 0) {
                pagesOrganizationContainer.innerHTML +=
                    `<button class="option-btn organizationChart-page active">${i+1}</button>`;
            } else {
                pagesOrganizationContainer.innerHTML +=
                    `<button class="option-btn organizationChart-page">${i+1}</button>`
            }
        };

        let pagesOrganizationBtns = document.querySelectorAll(".organizationChart-page");

        pagesOrganizationBtns.forEach((pagesOrganization, i) => {
            pagesOrganization.addEventListener("click", () => {

                pagesOrganization.classList.add("active");

                if (pagesOrganization.className == "option-btn organizationChart-page active") {

                    pagesOrganizationBtns.forEach((pagesOrganization1) =>  {
                        pagesOrganization1.classList.remove("active");
                    });
                    pagesOrganization.classList.add("active");

                    templateOrganization.innerHTML = " ";

                    loadTableContentOrganization(i);

                    let organizationCheckGeneral = document.getElementById("checkOrganization");
                    organizationCheckGeneral.checked = false;
                }
            });
        });
    }
    paginationOrganization(tableOrganization);

    // Select inputs
    function selectInputsOrganization() {
        let organizationCheckInputs = document.querySelectorAll(".organization-import");
        let organizationCheckGeneral = document.getElementById("checkOrganization");

        organizationCheckGeneral.addEventListener("click", () => {

            if(organizationCheckGeneral.checked) {
                organizationCheckInputs.forEach((checks) => {
                    checks.checked = true;
                });
            } else {
                organizationCheckInputs.forEach((checks) => {
                    checks.checked = false;
            });

            }
        });
    }
    selectInputsOrganization();

    //Load Page
    function chunckArrayInGroupsOrganization(arr, size) {
        var chunk = [], i;

        for (i = 0; i <= arr.length; i+= size) {
            chunk.push(arr.slice(i, i + size));
        }

        return chunk;
    }

    let chunkArrayTableContentsOrganization = chunckArrayInGroupsOrganization(tableOrganization, 6);

    function loadTableContentOrganization(i) {
        chunkArrayTableContentsOrganization[i].forEach((content) => {
            templateOrganization.innerHTML += `
                <tr>
                    <td>${content.evaluated}</td>
                    <td>${content.email}</td>
                    <td>${content.atributes}</td>
                    <td>${content.date}</td>
                    <td>${content.position}</td>
                    <td>
                        <label class="switch">
                            <input class="organization-import" type="checkbox" name="questionVisible">
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>`;
        });
        selectInputsOrganization()
    }
    loadTableContentOrganization(0);

    //Search Filter
    let makeOrganizationInput = document.getElementById("organizationChartSearch");

    makeOrganizationInput.addEventListener("keyup", () => {

        let filterOrganization = tableOrganization.filter((content) => {
            return makeOrganizationInput.value.toUpperCase() == content.evaluated.toUpperCase();
        });

        templateOrganization.innerHTML = "";
        let chunkfilterOrganization = chunckArrayInGroupsOrganization(filterOrganization, 6);

        function loadOrganization(i) {
            chunkfilterOrganization[i].forEach((content) => {
                templateOrganization.innerHTML += `
                    <tr>
                        <td>${content.evaluated}</td>
                        <td>${content.email}</td>
                        <td>${content.atributes}</td>
                        <td>${content.date}</td>
                        <td>${content.position}</td>
                        <td>
                            <label class="switch">
                                <input class="organization-import" type="checkbox" name="questionVisible">
                                <span class="slider round"></span>
                            </label>
                        </td>
                    </tr>`;
            })
            selectInputsOrganization();
        }

        paginationOrganization(filterOrganization);
        loadOrganization(0);
        if(!makeOrganizationInput.value) {
            organizationChart();
        }
    });


    // Filter Old Order
    let oldOrderBtn = document.getElementById("oldOrder");

    oldOrderBtn.addEventListener("click", () => {

        let filterOrderOld = tableOrganization.sort(function (date1, date2) {
            let newDate1 = new Date(date1.date),
                newDate2 = new Date(date2.date);
            return newDate1 - newDate2;
        });

        templateOrganization.innerHTML = "";
        let chunkfilterOrganization = chunckArrayInGroupsOrganization(filterOrderOld, 6);

        function loadOrganizationOldOrder(i) {
            chunkfilterOrganization[i].forEach((content) => {
                templateOrganization.innerHTML += `
                    <tr>
                        <td>${content.evaluated}</td>
                        <td>${content.email}</td>
                        <td>${content.atributes}</td>
                        <td>${content.date}</td>
                        <td>${content.position}</td>
                        <td>
                            <label class="switch">
                                <input class="organization-import" type="checkbox" name="questionVisible">
                                <span class="slider round"></span>
                            </label>
                        </td>
                    </tr>`;
            })
            selectInputsOrganization();
        }
        paginationOrganization(filterOrderOld);
        loadOrganizationOldOrder(0);
    });

    // Filter Recent Order
    let recentOrderBtn = document.getElementById("recentOrder");

    recentOrderBtn.addEventListener("click", () => {

        let filterOrderRecent = tableOrganization.sort(function (date1, date2) {
            let newDate1 = new Date(date1.date),
                newDate2 = new Date(date2.date);
            return newDate2 - newDate1;
        });

        templateOrganization.innerHTML = "";
        let chunkfilterOrganization = chunckArrayInGroupsOrganization(filterOrderRecent, 6);

        function loadOrganizationRecentOrder(i) {
            chunkfilterOrganization[i].forEach((content) => {
                templateOrganization.innerHTML += `
                    <tr>
                        <td>${content.evaluated}</td>
                        <td>${content.email}</td>
                        <td>${content.atributes}</td>
                        <td>${content.date}</td>
                        <td>${content.position}</td>
                        <td>
                            <label class="switch">
                                <input class="organization-import" type="checkbox" name="questionVisible">
                                <span class="slider round"></span>
                            </label>
                        </td>
                    </tr>`;
            })
            selectInputsOrganization();
        }
        paginationOrganization(filterOrderRecent);
        loadOrganizationRecentOrder(0);
    });

    // Filter Random Order
    let randomOrderBtn = document.getElementById("randomOrder");

    randomOrderBtn.addEventListener("click", () => {
        templateOrganization.innerHTML = "";
        organizationChart();
    });


}

export { organizationChart }