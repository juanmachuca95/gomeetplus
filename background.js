var notificationIcon = 'images/icon.png'

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender)
        if (request.notify === "chat") {
            request.chat.forEach(element => {
                let mensaje = ""
                element.messages.forEach((msg) => {
                    mensaje += msg +"\n"
                })

                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: notificationIcon,
                    title: element.sender_name,
                    message: mensaje,
                    priority: 0
                });
            });
            sendResponse({ status: "ok" });
            return true;
        }

        if (request.activeChat) {
            chrome.tabs.query({ active: true }, function (tabs) {
                let tab = tabs[0]
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['./scripts/notify.js'],
                }, () => {
                    if (chrome.runtime.lastError === undefined){
                        chrome.action.setBadgeBackgroundColor({ color: "#66ff66" })
                        chrome.action.setBadgeText({ text: "CHAT" })
                        sendResponse({ status: "ok" })
                    }
                })
                return true;
            })
        }

        if (request.desactiveChat) {
            chrome.tabs.query({ active: true }, function (tabs) {
                let tab = tabs[0]
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['./scripts/stopTimer.js']
                }, () => {
                    if (chrome.runtime.lastError === undefined){
                        chrome.action.setBadgeText({ text: "" })
                        sendResponse({ status: "ok" })
                    }
                })
            })
            return true;
        }

        if (request.getParticipantes){
            chrome.tabs.query({ active: true }, function (tabs) {
                let tab = tabs[0]
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['./scripts/inputFile.js', './scripts/read-excel-file.min.js'],
                }, () => {
                    if (chrome.runtime.lastError === undefined){
                        chrome.action.setBadgeText({ text: "UP" })
                    }
                })
            })
            sendResponse({ status: "ok" })
            return true;
        }

        if (request.getAusentes){
            chrome.tabs.query({ active: true }, function (tabs) {
                let tab = tabs[0]
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['./scripts/participants.js'],
                }, () => {
                    if (chrome.runtime.lastError === undefined){
                        chrome.action.setBadgeText({ text: "UP" })
                    }
                })
            })
            sendResponse({ status: "ok" })
            return true;
        }

        return true;
    }

);


