try {
    let form = document.createElement('form')
    let inputFile = document.createElement('input')
    inputFile.type = 'file'
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