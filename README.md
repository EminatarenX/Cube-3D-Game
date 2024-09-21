
# Cube Dash


Un juego de acción en 3D donde debes saltar sobre spikes tridimensionales en un espacio en constante
movimiento. [link](https://main--geometriadash.netlify.app/)

## Características del Juego

* Salta sobre spikes tridimensionales en un entorno en 3D.
* Cuanto más tiempo dures, mejor puntuación tendrás.
* Utiliza la librería TreeJS para crear el entorno 3D y todas las entidades del juego.
* **Física y Colisiones**: El juego utiliza workers para calcular físicas en el salto y colisiones con
spikes y otros obstáculos.
* **Conteo de Saltos y Tiempo**: Los workers también se encargan de contar el número de saltos y tiempo
jugado, proporcionando una mejor experiencia de juego.

## Características Técnicas

* Desarrollado con Vite y Vanilla JavaScript utilizando TypeScript.
* Única dependencia: TreeJS para el entorno 3D.
* Estilos de botones y marcadores utilizando Tailwind CSS.
* **Uso eficiente de Recursos**: El juego utiliza workers para no sobrecargar la CPU, asegurando una
experiencia fluida.

## Capturas de Pantalla

### Menú Principal

![Menu Principal](/public/menu.png)

### En Juego

![En Juego](/public/in-game-jump.png)

### Perder

![Perder](/public/game-over.png)

## Requisitos para Correr el Juego

* Node.js (versión 18 o superior)
* TypeScript (versión 4.x o superior)
* TreeJS
* Tailwind CSS

## Instalación y Ejecución

1. Clona este repositorio.
2. Instala las dependencias con `npm install` o `yarn install`.
3. Corre el juego con `npm run dev` o `yarn dev`.

¡Disfruta jugando a Geometria Dash!