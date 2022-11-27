// elements from dom
upload = document.getElementById('upload')
ausentes = document.getElementById('ausentes')
activeNotify = document.getElementById('activeNotify')
desactiveNotify = document.getElementById('desactiveNotify')

// Add events
upload.addEventListener('click', inputFile)
ausentes.addEventListener('click', getAusentes)
activeNotify.addEventListener('click', setActiveNotify)
desactiveNotify.addEventListener('click', setDesactiveNotify)

// functions
function inputFile() {
    let input = document.createElement('input')
    input.type = 'file'
    input.addEventListener('change', uploadFile)
    input.click()
}

function uploadFile(e) {
    // Using read-excel-file to read file excel
    readXlsxFile(e.target.files[0]).then((rows) => {
        let participants = []
        rows.forEach(element => {
            participants.push(element[0])
        });

        if (participants.length > 0) {
            // Set lista de alumnos o participantes que deberian asistir
            chrome.storage.local.set({ participants }, () => { })
            chrome.runtime.sendMessage({ setParticipants: true }, (response) => {
                if (response.status === "ok"){console.log("participantes cargados . . .")}
            });
            return
        }
    })
}

function getAusentes() {
    chrome.storage.local.get(['participants'], function (participantes) {
        chrome.tabs.query({ active: true }, function (tabs) {
            let tab = tabs[0]
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: participants,
                args: [participantes]
            }, (ausentes) => {
                chrome.storage.local.set({ ausentes }, () => { })
                window.location = 'report.html'
            })
        })
    })
}


function participants(participants) {
    var p = []
    let obj = participants.participants
    items = document.querySelectorAll(`[role="listitem"]`);
    if (items.length == 0) {
        document.querySelectorAll("[aria-pressed]")[2].click()
    } 
    
    for (var i = 0; i < items.length; i++) {
        spans = items[i].getElementsByTagName("span")
        p.push(spans[0].innerHTML)
    }

    let ausentes = obj.filter(x => !p.includes(x));
    return ausentes
}


function setActiveNotify() {
    chrome.runtime.sendMessage({ activeChat: true }, (response) => {
        if (response.status === "ok"){ console.log(response.status) }
    });
    window.close()
}

function setDesactiveNotify() {
    chrome.runtime.sendMessage({ desactiveChat: true }, (response) => {
        if (response.status === "ok"){
            chrome.action.setBadgeText({ text: '' });
        }
    });
    window.close()
} 
