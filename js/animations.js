let bgBars =  $('#background-overlay #bars');
let bgCheck1 = $('#background-overlay #check');
let bgCheck2 = $('#background-overlay #check-2');
let bgToggles1 = $('#background-overlay #toggles-1');
let bgToggles2 = $('#background-overlay #toggles-2');
let bgTable = $('#background-overlay #table');


function starAnimations() {
    $('#background-overlay').css('display', 'block');
    
    setTimeout(() => {
        bgBars.css('left', 0);
    }, 100);
    
    setTimeout(() => {
        bgCheck1.css('opacity', 1);
    }, 300);

    setTimeout(() => {
        bgToggles1.css('opacity', 1)
        bgToggles1.css('transform', 'scale(1)')
        
    }, 300);
    
    setTimeout(() => {
        bgToggles2.css('opacity', 1)
        bgToggles2.css('transform', 'scale(1)')
    }, 400);

    setTimeout(() => {
        bgTable.css('right', 0);
    }, 500);

    setTimeout(() => {
        bgCheck2.css('opacity', 1);
    }, 600);
}

function reverseAnimations() {
    bgBars.css('left', '-16%');
    bgCheck1.css('opacity', 0);
    bgToggles1.css({
        'opacity': 0,
        'transform': 'scale(0)',
    });
    bgToggles2.css({
        'opacity': 0,
        'transform': 'scale(0)',
    });
    bgTable.css('right', '-15%');
    bgCheck2.css('opacity', 0);

    setTimeout(() => {
        $('#background-overlay').css('display', 'none');
    }, 1000);
}