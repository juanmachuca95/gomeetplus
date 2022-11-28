try {
    items = document.querySelectorAll(`[role="listitem"]`);
    if (items.length == 0) {
        document.querySelectorAll("[aria-pressed]")[2].click()
    } 
    
    let form = document.createElement('form')
    let inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.accept = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    form.appendChild(inputFile)
    inputFile.addEventListener('change', (e) => {
        readXlsxFile(e.target.files[0]).then((rows) => {
            let participants = []
            rows.forEach(element => {
                participants.push(element[0])
            });
    
            if (participants.length > 0) {
                // Set lista de alumnos o participantes que deberian asistir
                chrome.storage.local.set({ participants }, () => { })
                form.reset()
                return
            }
        })
    })
    inputFile.click()
} catch (error) {
    alert(error)   
}