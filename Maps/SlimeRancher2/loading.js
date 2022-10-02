console.log('loading.js');

let arr = [
    'iconGordoAngler',
    'iconGordoBatty',
    'iconGordoBoom',
    'iconGordoCotton',
    'iconGordoCrystal',
    'iconGordoDervish',
    'iconGordoFlutter',
    'iconGordoGold',
    'iconGordoHoney',
    'iconGordoHunter',
    'iconGordoMosaic',
    'iconGordoPedia',
    'iconGordoPhosphor',
    'iconGordoPink',
    'iconGordoQuantum',
    'iconGordoRad',
    'iconGordoRingtail',
    'iconGordoRock',
    'iconGordoTabby',
    'iconGordoTangle',
    'iconLargoPedia',
]

function getRandomInt() {
    return Math.floor(Math.random() * (arr.length - 1));
}

let src = `./Icons/${arr[getRandomInt()]}.png`;
document.getElementById("loading").src = src;