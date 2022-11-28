participants()

function participants() {
    chrome.storage.local.get(['participants'], (participantes) => {
        var p = []
        let obj = participantes.participants
        items = document.querySelectorAll(`[role="listitem"]`);
        if (items.length == 0) {
            document.querySelectorAll("[aria-pressed]")[2].click()
            items = document.querySelectorAll(`[role="listitem"]`);
        } 

        for (var i = 0; i < items.length; i++) {
            spans = items[i].getElementsByTagName("span")
            p.push(spans[0].innerHTML)
        }
        console.log("participantes actuales ", p, items.length, items)
        let ausentes = obj.filter(x => !p.includes(x));
        chrome.storage.local.set({ ausentes }, () => { })
    })
}