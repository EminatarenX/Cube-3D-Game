// particleWorker.ts

self.onmessage = (e: MessageEvent) => {
    const particleCount = e.data.particleCount || 1000; 
    const positions = [];
    const colors = [];
  
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() * 200) - 100;
      const y = (Math.random() * 200) - 100;
      const z = (Math.random() * 200) - 100;
  
      positions.push(x, y, z);
  
      const color = {
        r: Math.random() * 0.2,
        g: Math.random() * 0.2,
        b: Math.random() * 0.2,
      };
  
      colors.push(color.r, color.g, color.b);
    }
  
    // Enviar los datos de posiciones y colores al hilo principal
    self.postMessage({
      positions,
      colors,
    });
  };
  