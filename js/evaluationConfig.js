function storeConfig(el) {
    let status = el.checked;
    let selectedConfig = el.closest('.configuration').querySelector('.config-text').innerText;

    let storedConfigs = getStoredConfig();

    /* if (status) {
        
        if (typeof storeConfigs == 'object') {
            let config = _.findKey(storedConfigs, value => value === selectedConfig)
        } else {
            localStorage.setItem
        }

    } */
    console.log('test');
}

function getStoredConfig() {
    let configs = localStorage.getItem('configs');

    if (configs == undefined) return false;

    return JSON.parse(configs);
}