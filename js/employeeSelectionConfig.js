var totalAreas = $('.personal-selection-card').length;
var employeesToTest = [];
 // Aqui se debe generar el contenido de las tarjetas
var personalCards = [
    `<div class="personal-selection-card">
        <div class="element-title">Marketing</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
                <li>Iliana</li>
            </ul>
        </div>
    </div>`,
    `<div class="personal-selection-card">
        <div class="element-title">Recursos Humanos</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
            </ul>
        </div>
    </div>`,
    `<div class="personal-selection-card">
        <div class="element-title">T.I</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
                <li>Ilse</li>
            </ul>
        </div>
    </div>`,
    `<div class="personal-selection-card">
        <div class="element-title">Ventas</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
            </ul>
        </div>
    </div>`,
    `<div class="personal-selection-card">
        <div class="element-title">Ingeniería</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
            </ul>
        </div>
    </div>`,
    `<div class="personal-selection-card">
        <div class="element-title">Atención a cliente</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
                <li>Jose Luis Vasquez </li>
            </ul>
        </div>
    </div>`,
    `<div class="personal-selection-card">
        <div class="element-title">Operaciones</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
            </ul>
        </div>
    </div>`,
    `<div class="personal-selection-card">
        <div class="element-title">Mantenimiento</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
            </ul>
        </div>
    </div>`,
    `<div class="personal-selection-card">
        <div class="element-title">Area 5</div>
        <div class="personal-container">
            <ul>
                <li>Mauricio González</li>
                <li>Alan Croda</li>
                <li>Miguel Rivera</li>
                <li>Jesus Fortoul</li>
                <li>Laura Herberth</li>
                <li>Carlos Pímentel</li>
                <li>Jesus</li>
                <li>Iris Vasquez</li>
            </ul>
        </div>
    </div>`,
];

// Select a single employee from area
$('#personal-selection').on('click', 'li', function () {
    let area = $(this).parents('.personal-selection-card').find('.element-title').text();
    let name = $(this).text();

    if ($(this).hasClass('active')) {

        $(this).removeClass('active');

        employeesToTest.forEach( (employee, index) => {
            if ( $(this).text() == employee.name ) {
                if ( $(this).parents('.personal-selection-card').find('.element-title').text() == employee.area)
                    employeesToTest.splice(employeesToTest.findIndex(employee => employee.name === $(this).text() ), 1)
            }
        });

        console.log(employeesToTest);

    }
    else {
        $(this).addClass('active');
        
        employeesToTest.push({area, name});

        console.log(employeesToTest);
    } 
});

// Select all employees from area
$('#personal-selection').on('click', '.element-title', function () {
    if ($(this).hasClass('active')) {

        let areaEmployees = employeesToTest.filter(employee => employee.area === $(this).text() );
        
        $(this).parent().find('li').toArray().forEach(employee => {
            $(employee).removeClass('active');
        });

        //Remove all employees from the areaEmployees list
        areaEmployees.forEach( areaEmployee => 
            employeesToTest.splice(employeesToTest.findIndex( employee => employee.name === areaEmployee.name), 1)
        );

        $(this).removeClass('active');

        console.log(employeesToTest);

    }
    else {
        $(this).parent().find('li').toArray().forEach(employee => {
            $(employee).addClass('active');
            employeesToTest.push({area: $(this).text(), name: $(employee).text()})
        })
        $(this).addClass('active');
    }
})

function loadEmployeePagination(actualDom) {
    if (actualDom != undefined) {
        personalCards = actualDom;
    }
    $('.employee-paginator-container').pagination({
        dataSource: personalCards, 
        pageSize: 6,
        showPrevious: false,
        showNext: false,
        classPrefix: "page-btn",
        callback: function(data, pagination) {
            $('#personal-selection').html('');
            data.forEach(area => {
                $('#personal-selection').append(area)
            });
    
        }
    });
    
}
    

function refreshSelected() {
    employeesToTest.forEach(employee => {
        $('.element-title').toArray().forEach(area => {
            if ($(area).text() == employee.area) {
                if ( $(area).parent().find(`li:contains("${employee.name}")`).length > 0 ) 
                    $(area).parent().find(`li:contains("${employee.name}")`).addClass('active');
            }
        })
    })
};

function removeFile() {
    
    $('#scv-file').val('');
    $('.csv-overlay').hide();
    employeesToTest = [];
    $('#personal-selection').find('.element-title').removeClass('active');
    $('#personal-selection').find('li').removeClass('active');
    refreshSelected();

}

// Add active to selected elements after page change
$('.employee-paginator-container').addHook('afterPaging', function () {
    refreshSelected()
});


// Search
$('#employee-search').keyup( event => {  

    // Clear current cards to make all appear on the same container 
    $('#personal-selection').html('');
    $('#personal-selection').append(personalCards);
    $('#personal-selection').css({
        'overflow-y': 'auto',
        'flex-wrap': 'wrap'
    });
    // Hide paginator to avoid confusion
    $('.employee-paginator-container').pagination('hide');
    
    // Make a copy of the actual cards state
    let allCards = $('.personal-selection-card').toArray();
    let searchString = $(event.currentTarget).val();

    // Search if any employee contains the string and show the card
    allCards.forEach(card => {
        if (!$(card).children('.personal-container').find('li').text().includes(searchString)) {
            $(card).css('display', 'none');
        } 
        else {
            $(card).css('display', 'flex');
            refreshSelected();
        }
    });

    // When filter is clear the copy of the cards is reloaded to the paginator.
    if (searchString == '') {
        $('#personal-selection').attr('style', '');
        loadEmployeePagination(allCards);
        $('.employee-paginator-container').pagination('show');
        refreshSelected();
    }

});

$('#scv-file').on('change', () => {
    if ($('#scv-file').val != '') $('.csv-overlay').css('display', 'flex');
})

loadEmployeePagination();