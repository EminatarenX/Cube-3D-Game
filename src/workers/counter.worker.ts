let totalJumps = 0

self.addEventListener('message', (event) => {
    if(event.data === 'startJump'){
        totalJumps++
        self.postMessage(totalJumps)
    }
})