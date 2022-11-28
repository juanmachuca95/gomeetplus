// elements from dom
upload = document.getElementById('upload')
ausentes = document.getElementById('ausentes')
activeNotify = document.getElementById('activeNotify')
desactiveNotify = document.getElementById('desactiveNotify')

// Add events
ausentes.addEventListener('click', getAusentes)
activeNotify.addEventListener('click', setActiveNotify)
desactiveNotify.addEventListener('click', setDesactiveNotify)
upload.addEventListener('click', getParticipantes)


function getParticipantes(){
    chrome.runtime.sendMessage({ getParticipantes: true }, () => {})
}

function getAusentes() {
    chrome.runtime.sendMessage({ getAusentes: true }, (response) => {
        if (response.status === "ok"){
            window.location = 'report.html'        
        }
    })
}

function setActiveNotify() {
    chrome.runtime.sendMessage({ activeChat: true }, () => {});
}

function setDesactiveNotify() {
    chrome.runtime.sendMessage({ desactiveChat: true }, () => {});
} 
