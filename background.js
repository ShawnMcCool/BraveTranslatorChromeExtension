async function currentTab() {
    let [tab] = await chrome.tabs.query(
        {active: true, currentWindow: true},
    );
    return tab;
}

function translateTab(tab) {
    chrome.tabs.update(
        tab.id,
        {
            url: "https://translate.google.com/translate?tl=en&u=" + tab.url,
        },
    );
}

chrome.action.onClicked.addListener((tab) => {
    translateTab(tab);
});

chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'translate-page':
            currentTab().then((tab) => translateTab(tab))
            break;
    }
});