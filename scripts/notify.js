var init
var totalMensajesActuales = [];
var myInterval
try {
    if(!init){
        document.querySelectorAll("[aria-pressed]")[3].click()
        myInterval = setInterval(function(){
            let nuevosMensajesActuales = getMessages()
            diff = getDifference(totalMensajesActuales, nuevosMensajesActuales)
            if (diff.length > 0){
                chrome.runtime.sendMessage({ notify: "chat", chat: diff }, () => {});
                totalMensajesActuales = nuevosMensajesActuales 
            }
        }, 1000)
        init = true
    }
} catch (e) {
    alert("No estas en una reunion de google meet")
}



function getMessages() {
    let nuevosMessages = []
    document.querySelectorAll('[data-sender-name]').forEach((element) => {
        let obj = {
            'sender_name': element.getAttribute('data-sender-name'),
            'formatted_timestamp': element.getAttribute('data-formatted-timestamp'),
            'messages': []
        }
        element.lastChild.querySelectorAll('[data-message-text]').forEach((msg) => {
            obj.messages.push(msg.getAttribute('data-message-text'))
        })

        nuevosMessages.push(obj)
    })

    return nuevosMessages
}


// Obtiene los mensajes que no se han enviado aún
function getDifference(actuales, nuevos){
    var mensajesParaEnviar = [];
    for(var i = 0; i < actuales.length; i++){
        if(actuales[i].messages.length !== nuevos[i].messages.length){
            let nuevoObj = {
                'sender_name': actuales[i].sender_name,
                'formatted_timestamp': actuales[i].formatted_timestamp,
                'messages': []
            }

            for (var j = actuales[i].messages.length; j < nuevos[i].messages.length; j++){
                nuevoObj.messages.push(nuevos[i].messages[j]);
            }

            mensajesParaEnviar.push(nuevoObj);
        }
    }

    if (actuales.length < nuevos.length) {
        for (var i = actuales.length; i < nuevos.length; i++){
            mensajesParaEnviar.push(nuevos[i])
        }
    }

    return mensajesParaEnviar
}


function stopTimer() {
    try {
        init = false
        clearInterval(myInterval)
    } catch (error) {
        alert("Las notificación ya estabas desactivadas")
    }
}