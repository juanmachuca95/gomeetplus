stopTimer()

function stopTimer() {
    try {
        init = false
        clearTimeout(myInterval)
    } catch (error) {
        alert("Las notificación ya estabas desactivadas")
    }
}