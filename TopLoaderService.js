const animationTime = 800;
const intervalTimeout = 10;
const widthVelocity = 110 * intervalTimeout / animationTime;

let targetReached = false;
let interval;
let loader;
let width = 0;
let target = 0;


const startInterval = () => {
    if (!loader) {
        loader = getLoader(document);

        if (!loader) {
            console.log('loader not found');
            return;
        }
    }

    if (!interval) {
        interval = setInterval(animateWidth, intervalTimeout);
    }
}

const animateWidth = () => {
    if (width >= 100) {
        clearTimeout(interval);
        interval = null;
        loader.style.width = 0;
        width = 0;
        return;
    }

    if (width >= target && !targetReached) {
        targetReached= true;
    }

    width += !targetReached ? widthVelocity : (widthVelocity/50);
   
    loader.style.width = width + '%';
}



export default class TopLoaderService {
    static start(percentage) {
        target = percentage || 35;
        startInterval();
    }

    static end() {
        target = 200;
        targetReached = false;
    }
}

const getLoader = (document) => {
    let loader = document.getElementById("progress");
    if (loader) return loader;

    loader = document.createElement('div');
    loader.setAttribute("id", "progress");
    loader.appendChild(document.createElement('b'));
    loader.appendChild(document.createElement('i'));
    document.body.appendChild(loader);

    return loader;
}