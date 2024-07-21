function convertFromKg() {
    const kg = document.getElementById('kgInput').value;
    document.getElementById('lbInput').value = (kg * 2.20462).toFixed(2);
    document.getElementById('ozInput').value = (kg * 35.274).toFixed(2);
}

function convertFromLb() {
    const lb = document.getElementById('lbInput').value;
    document.getElementById('kgInput').value = (lb / 2.20462).toFixed(2);
    document.getElementById('ozInput').value = (lb * 16).toFixed(2);
}

function convertFromOz() {
    const oz = document.getElementById('ozInput').value;
    document.getElementById('kgInput').value = (oz / 35.274).toFixed(2);
    document.getElementById('lbInput').value = (oz / 16).toFixed(2);
}
