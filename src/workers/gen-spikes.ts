
self.onmessage = (e: MessageEvent) => {
  const { range, spikeNumber } = e.data;

  let spikes = [] 

  for (let i = 0; i < spikeNumber; i++) {
    const spikeData = {
        position: {
            x: (range * Math.random()) + 2
        }
    }
     
    spikes.push(spikeData);  
  }

  postMessage({spikes}); 
};
