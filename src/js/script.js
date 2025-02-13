const sectors = [
    { color: "#8B0000", text: "#FFFFFF", label: "Blasen" },
    { color: "#FF0000", text: "#FFFFFF", label: "Küssen" },
    { color: "#8B0000", text: "#FFFFFF", label: "Tot" },
    { color: "#FF0000", text: "#FFFFFF", label: "Lecken" },
    { color: "#8B0000", text: "#FFFFFF", label: "Boobies" },
    { color: "#FF0000", text: "#FFFFFF", label: "Pussy" },
    { color: "#8B0000", text: "#FFFFFF", label: "Reiten" },
    { color: "#FF0000", text: "#FFFFFF", label: "Doggy" },
    { color: "#8B0000", text: "#FFFFFF", label: "Anal" },
    { color: "#FF0000", text: "#FFFFFF", label: "hehehe" },
];

const events = {
    listeners: {},
    addListener: function (eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
    },
    fire: function (eventName, ...args) {
        if (this.listeners[eventName]) {
            for (let fn of this.listeners[eventName]) {
                fn(...args);
            }
        }
    },
};

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const spinEl = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext("2d");
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

let spinButtonClicked = false;

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();

    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();

    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 30px 'Lato', sans-serif";
    
    // Adjust font size to fit within the sector
    let fontSize = 30;
    ctx.font = `bold ${fontSize}px 'Lato', sans-serif`;
    while (ctx.measureText(sector.label).width > rad - 10) {
        fontSize--;
        ctx.font = `bold ${fontSize}px 'Lato', sans-serif`;
    }
    
    ctx.fillText(sector.label, rad - 10, 10);
    //

    ctx.restore();
}

function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;

    if (angVel) {
        spinEl.textContent = sector.label;
        spinEl.style.background = sector.color;
        spinEl.style.color = sector.text;
    }
}

function frame() {
    // Fire an event after the wheel has stopped spinning
    if (!angVel && spinButtonClicked) {
        const finalSector = sectors[getIndex()];
        events.fire("spinEnd", finalSector);
        spinButtonClicked = false; // reset the flag
        spinEl.textContent = finalSector.label; // Ensure the final label remains displayed
        spinEl.style.background = finalSector.color;
        spinEl.style.color = finalSector.text;
        document.getElementById("final-selection").textContent = `Eier sagen: ${finalSector.label}`;
        return;
    }

    angVel *= friction; // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
}

function engine() {
    frame();
    requestAnimationFrame(engine);
}

function init() {
    sectors.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine
    spinEl.textContent = "Drehen"; // Set initial text
    spinEl.style.background = "#141414"; // Set initial background color
    spinEl.style.color = "#FFF"; // Set initial text color
    spinEl.addEventListener("click", () => {
        if (!angVel) angVel = rand(0.25, 0.45);
        spinButtonClicked = true;
    });
}

init();

events.addListener("spinEnd", (sector) => {
    console.log(`Die Eier haben entschieden: ${sector.label}`);
});