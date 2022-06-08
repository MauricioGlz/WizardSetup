var confirmedNetworks = [];

const virtualClasses = {
    ".evaluators-selection-column": [
        "evaluators-row",
        "evaluators-space-between",
        "evaluators-align-items-center",
        "evaluators-flex-grow-1"
    ],
    ".evaluators-text-input": [
        "wizard-input",
        "evaluators-column-text-input"
    ],
    "evaluators-employee-card": [
        "evaluators-column"
    ],
    ".evaluators-content-panel": [
        "evaluators-row",
        "evaluators-flex-align-start",
        "evaluators-flex-gap-1",
        "evaluators-flex-grow-1"
    ]
}

for (const virtual in virtualClasses)
    document.querySelectorAll(virtual)
        .forEach(e => e.classList.add(...virtualClasses[virtual]))

const areaSelector = document.querySelector("#evaluators-select-area")
const toEvaluatePanel = document.querySelector("#to-evaluate-list")
const peersPanel = document.querySelector("#peers-list")
const superiorsPanel = document.querySelector("#superiors-list")
const subordinatesPanel = document.querySelector("#subordinates-list")
// const toEvaluateFinderInput = document.querySelector("#to-evaluate-finder")

const getAreaSelection = () => areaSelector.options[areaSelector.selectedIndex].text
const resetSelectedAreas = () => { areaSelector.innerHTML = '<option value="all">Todas</option>' }
const resetToEvaluatePanel = () => { toEvaluatePanel.innerHTML = "" }
const loadEmployees = (employees, panel = toEvaluatePanel) => {
    resetToEvaluatePanel()

    employees.forEach(({ name }) => {
        const employee = document.createElement("li")
        employee.innerHTML += name
        employee.setAttribute("onClick", "(selectEmployeeToEvaluate.bind(this))()")
        panel.appendChild(employee)
    })
}

var confirmedNetworks = []
var evaluatorsEmployeesDisplayCount = {
    peers: 3,
    superiors: 3,
    subordinates: 3
}
var evaluatorsEmployees = {
    peers: [
        {
            id: 100,
            name: "William Arthur",
        },
        {
            id: 101,
            name: "Marina Ramos",
        },
        {
            id: 102,
            name: "Wallace",
        }
    ],
    superiors: [
        {
            id: 104,
            name: "Gromit",
        },
        {
            id: 105,
            name: "Wallace",
        }
    ],
    subordinates: [
        {
            id: 106,
            name: "Topoyiyo",
        },
        {
            id: 107,
            name: "Elvis (El Panadero) Gutierrez",
        }
    ]
}
var temporalNetwork = {}
var currentAreaFilter = "Todas"

function loadEvaluatorsConfig(employees = JSON.parse(localStorage.getItem('employeesToTest')), fullEmployeesList = evaluatorsEmployees) {
    resetSelectedAreas()

    const selectedAreas = [...new Set(employees.map(({ area }) => area))]

    selectedAreas.forEach(area => {
        const option = document.createElement("option")
        option.setAttribute("value", area)
        option.innerHTML += area
        areaSelector.appendChild(option)
    })

    loadEmployees(fullEmployeesList.peers, peersPanel)
    loadEmployees(fullEmployeesList.superiors, superiorsPanel)
    loadEmployees(fullEmployeesList.subordinates, subordinatesPanel)
    loadEmployees(employees)
}

function selectArea() {
    currentAreaFilter = getAreaSelection()
    
    findEmployeesToEvaluate()
}

function findEmployeesToEvaluate() {
    const value = toEvaluateFinderInput.value.trim()
    const employees = JSON.parse(localStorage.getItem("employeesToTest"))
    let filteredEmployees = employees

    if (value != "" || selectArea != "Todas")
        filteredEmployees = employees.filter(({ area, name }) =>
            currentAreaFilter != "Todas" ?
                name.toLowerCase().includes(value.toLowerCase()) && area == currentAreaFilter
            :
                name.toLowerCase().includes(value.toLowerCase())
        )

    loadEmployees(filteredEmployees)
}

function selectEmployeeToEvaluate() {
    
    if (!this.classList.contains("evaluators-selected")) {
        if (this.parentElement.id == 'to-evaluate-list') $('#to-evaluate-list').find('li').removeClass('evaluators-selected') 
        this.classList.add("evaluators-selected")
    }
    else {
        this.classList.remove("evaluators-selected")
    }
}

function addExternal() {
    $('#external-emails').show();
    $('#confirm-emails').show();
    $('#add-external-btn').hide();
}

function addEmails() {
    $('#external-emails').hide();
    $('#confirm-emails').hide();
    $('#add-external-btn').show();

    let emails = $('#external-emails').val();
    let emailsArr = emails.split(',');

    emailsArr.forEach( email => {
        $('#network-confirmation-externals').append(`
            <li>${email}</li>
        `)
    })
}

function confirmNetwork() {
    clearNetwork();
    let employee = $('#to-evaluate-list').find('.evaluators-selected');
    let area = $('#evaluators-select-area').val();
    let equals = $('#peers-list').find('.evaluators-selected').toArray();
    let superiors = $('#superiors-list').find('.evaluators-selected').toArray();
    let subordinates = $('#subordinates-list').find('.evaluators-selected').toArray();
    let network = {name: employee.text() ,area, equals, superiors, subordinates};

    if (network.equals.length >= 1 && network.superiors.length >= 1 && network.subordinates.length >= 1) {
        network.equals.forEach( eEmployee => {
            $(eEmployee).removeClass('evaluators-selected');
            $('#network-confirmation-equals').append(`<li> ${$(eEmployee).text()} </li>`);
        });

        network.superiors.forEach( eSuperior => {
            $(eSuperior).removeClass('evaluators-selected');
            $('#network-confirmation-superiors').append(`<li> ${$(eSuperior).text()} </li>`);
        });

        network.subordinates.forEach( eSubordinate => {
            $(eSubordinate).removeClass('evaluators-selected');
            $('#network-confirmation-subordinates').append(`<li> ${$(eSubordinate).text()} </li>`);
        });

        $('#confirmed-employees').append(`
            <option value="${employee.text()}" class="added-opt"> ${employee.text()} </option>
        `);

        $('#confirmed-employees').val(employee.text());

        employee.remove();
        storeEmployeeNetwork(network);

        $('#confirmed-employees').change();
    }


}

function storeEmployeeNetwork(network) {
    confirmedNetworks.push(network);
}

function clearNetwork() {
    $('#network-confirmation-equals').html('')
    $('#network-confirmation-superiors').html('')
    $('#network-confirmation-subordinates').html('')
}

$('#confirmed-employees').on('change', function () {
    clearNetwork();
    let name = $(this).val();
    
    confirmedNetworks.forEach( network => {
        if (name == network.name) {

            network.equals.forEach( equal => {
                $('#network-confirmation-equals').append(`<li>${$(equal).text()}</li>`)
            })

            network.subordinates.forEach( subordinate => {
                $('#network-confirmation-subordinates').append(`<li>${$(subordinate).text()}</li>`)
            })

            network.superiors.forEach( superior => {
                $('#network-confirmation-superiors').append(`<li>${$(superior).text()}</li>`)
            })
        }
    })

})

function removeEmployeeNetwork() {
    let employee = $('#confirmed-employees').val();
    $(`#confirmed-employees option[value="${employee}"]`).remove();
    $('#to-evaluate-list').append(`<li onclick="(selectEmployeeToEvaluate.bind(this))()">${employee}</li>`)
    $(`#confirmed-employees`).change();

    confirmedNetworks = confirmedNetworks.filter( network => network.name != employee )
}

$('#search-on-network').on('keyup', function () {
    let searchString = $(this).val();
    let currentNetworks = $('.added-opt').toArray();

    currentNetworks.forEach( opt => {
        let name = $(opt).val()
        if (!name.includes(searchString)) $(opt).hide();
        else $(opt).show();
        
    });

    $(`#confirmed-employees`).change();

})

$('.evaluators-text-input').on('keyup', function () {
    if ($(this).attr('id') == 'search-on-network') return false

    let searchString = $(this).val().toLowerCase();

    let searchList = $(this).parent().find('li').toArray();

    searchList.forEach( element => {
        let name = $(element).text().toLowerCase();
        if (!name.includes(searchString)) $(element).hide();
        else $(element).show();
    })
    
})


areaSelector.setAttribute("onChange", "selectArea()")
// toEvaluateFinderInput.setAttribute("onKeyUp", "findEmployeesToEvaluate()")
document.querySelector("#confirm-network-btn").setAttribute("onClick", "confirmNetwork()")
document.querySelector("#add-external-btn").setAttribute("onClick", "addExternal()")