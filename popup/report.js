document.addEventListener('DOMContentLoaded', () => {
    let report = document.getElementById('fecha')
    let lista = document.getElementById('listaAusentes')

    chrome.storage.local.get(['ausentes'], (ausentes) => {
        let date = new Date();        
        let fecha = date.toLocaleDateString('es-AR');
        let hora = date.toLocaleTimeString('es-AR')
        report.textContent = "🗓️ Ausentes día " + fecha + " - " + hora
        
        let aus = ausentes.ausentes
        if (aus.length > 0) {
            aus.forEach(element => {
                var li = document.createElement('li')
                li.textContent = element
                li.classList.add("list-group-item")
                lista.appendChild(li)
            });
            return 
        }
      
        var li = document.createElement('li')
        li.textContent = "No hay ausentes"
        li.classList.add("list-group-item")
        lista.appendChild(li)
    })
})
