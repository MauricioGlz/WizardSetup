function storeNewEvaluation() {
    let initialData = {
        name: document.getElementById('eval-name').value,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('end-date').value,
    };

    localStorage.setItem('initialData', JSON.stringify(initialData));
}

export {storeNewEvaluation};