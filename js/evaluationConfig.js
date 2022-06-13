function storeConfig() {
    let configurations = {}
    document.querySelectorAll('.config-toggle').forEach( (toggle, index) => {
        if (toggle.checked) {
            configurations[index] = toggle.value
        }
    })
    localStorage.setItem('congigurations', JSON.stringify(configurations));
    
}

function storeWelcomeMessage() {
    let welcomeEditor = document.getElementById('welcomeTextEditor').__quill;
    const content = welcomeEditor.root.innerHTML;

    localStorage.setItem('welcome', content);
}

function getStoredConfig() {
    let configs = localStorage.getItem('configs');

    if (configs == undefined) return false;

    return JSON.parse(configs);
}

export {storeConfig, storeWelcomeMessage}