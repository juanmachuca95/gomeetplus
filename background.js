var notificationIcon = 'images/icon.png'

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender)
        if (request.notify === "chat") {
            request.chat.forEach(element => {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: notificationIcon,
                    title: element.sender_name,
                    message: element.messages[0],
                    priority: 0
                });
            });
            sendResponse({ status: "ok" });
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
            })
            sendResponse({ status: "ok" })
        }

        if (request.desactiveChat) {
            console.log("Desactivando chat")
            chrome.tabs.query({ active: true }, function (tabs) {
                let tab = tabs[0]
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['./scripts/stopTimer.js'],
                }, () => chrome.runtime.lastError)
            })
            sendResponse({ status: "ok" })
        }


        if (request.setParticipants) {
            chrome.action.setBadgeBackgroundColor({ color: "#66ff66" })
            chrome.action.setBadgeText({ text: "UP" })
            sendResponse({ status: "ok" })
        }
    }
);


