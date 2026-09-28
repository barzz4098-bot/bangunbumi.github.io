// ============================================
// EARTH CREATOR
// ============================================

const world = document.getElementById("world");

let scene;
let camera;
let renderer;

let earth;
let atmosphere;

let stars;

let mouseDown = false;

let previousMouseX = 0;
let previousMouseY = 0;

let rotationSpeed = 0.001;

let selectedTool = "land";


// ============================================
// WORLD DATA
// ============================================

let worldData = {

    vegetation: 0,

    animals: 0,

    population: 0,

    cities: 0,

    villages: 0,

    mountains: 0,

    forests: 0,

    deserts: 0,

    snow: 0,

    volcanoes: 0,

    rivers: 0,

    plants: 0,

    factories: 0,

    temperature: 15,

    rain: 50,

    atmosphere: 80,

    year: 0,

    weather: "normal",

    day: true

};


// ============================================
// INIT
// ============================================

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(

        45,

        world.clientWidth / world.clientHeight,

        0.1,
        1000

    );

    camera.position.z = 4.5;


    renderer = new THREE.WebGLRenderer({

        antialias: true,

        alpha: true

    });

    renderer.setPixelRatio(

        Math.min(window.devicePixelRatio, 2)

    );

    renderer.setSize(

        world.clientWidth,

        world.clientHeight

    );

    renderer.outputEncoding = THREE.sRGBEncoding;

    world.appendChild(renderer.domElement);


    createLights();

    createStars();

    createEarth();

    createAtmosphere();

    createInitialWorld();

    animate();


    setTimeout(() => {

        document.getElementById("loading").style.opacity = "0";

        setTimeout(() => {

            document.getElementById("loading").style.display = "none";

        }, 800);

    }, 1200);

}


// ============================================
// LIGHT
// ============================================

function createLights() {

    const ambient = new THREE.AmbientLight(

        0x6c88aa,

        0.55

    );

    scene.add(ambient);


    const sun = new THREE.DirectionalLight(

        0xffffff,

        2.3

    );

    sun.position.set(

        5,
        3,
        5

    );

    scene.add(sun);

}


// ============================================
// STARS
// ============================================

function createStars() {

    const geometry = new THREE.BufferGeometry();

    const vertices = [];

    for (let i = 0; i < 3500; i++) {

        const x = (Math.random() - 0.5) * 500;

        const y = (Math.random() - 0.5) * 500;

        const z = (Math.random() - 0.5) * 500;

        vertices.push(x, y, z);

    }

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            vertices,

            3

        )

    );


    const material = new THREE.PointsMaterial({

        color: 0xffffff,

        size: 0.7

    });


    stars = new THREE.Points(

        geometry,

        material

    );

    scene.add(stars);

}


// ============================================
// EARTH
// ============================================

function createEarth() {

    const geometry = new THREE.SphereGeometry(

        1.55,

        96,

        96

    );


    const material = new THREE.MeshStandardMaterial({

        color: 0x2470a8,

        roughness: 0.8,

        metalness: 0

    });


    earth = new THREE.Mesh(

        geometry,

        material

    );

    scene.add(earth);

}


// ============================================
// ATMOSPHERE
// ============================================

function createAtmosphere() {

    const geometry = new THREE.SphereGeometry(

        1.65,

        64,

        64

    );


    const material = new THREE.MeshBasicMaterial({

        color: 0x3caeff,

        transparent: true,

        opacity: 0.14,

        side: THREE.BackSide

    });


    atmosphere = new THREE.Mesh(

        geometry,

        material

    );

    scene.add(atmosphere);

}


// ============================================
// INITIAL WORLD
// ============================================

function createInitialWorld() {

    addLand(20);

    addForest(12);

    addAnimals(10);

}


// ============================================
// RANDOM WORLD OBJECT
// ============================================

function randomSpherePosition(radius = 1.57) {

    const u = Math.random();

    const v = Math.random();

    const theta = 2 * Math.PI * u;

    const phi = Math.acos(

        2 * v - 1

    );


    return new THREE.Vector3(

        radius *
        Math.sin(phi) *
        Math.cos(theta),

        radius *
        Math.sin(phi) *
        Math.sin(theta),

        radius *
        Math.cos(phi)

    );

}


// ============================================
// CREATE LAND PATCH
// ============================================

function addLand(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition();

        const geometry = new THREE.SphereGeometry(

            0.08 + Math.random() * 0.1,

            8,
            8

        );


        const material = new THREE.MeshStandardMaterial({

            color: 0x5e9f4e,

            roughness: 1

        });


        const land = new THREE.Mesh(

            geometry,

            material

        );


        land.position.copy(position);


        land.lookAt(0, 0, 0);


        earth.add(land);

    }

}


// ============================================
// FOREST
// ============================================

function addForest(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const group = new THREE.Group();

        const position = randomSpherePosition(1.61);


        const trunkGeometry =

            new THREE.CylinderGeometry(

                0.008,

                0.012,

                0.06,

                5

            );


        const trunkMaterial =

            new THREE.MeshStandardMaterial({

                color: 0x593b24

            });


        const trunk = new THREE.Mesh(

            trunkGeometry,

            trunkMaterial

        );


        const leavesGeometry =

            new THREE.ConeGeometry(

                0.035,

                0.11,

                6

            );


        const leavesMaterial =

            new THREE.MeshStandardMaterial({

                color: 0x2f8c42

            });


        const leaves = new THREE.Mesh(

            leavesGeometry,

            leavesMaterial

        );


        leaves.position.y = 0.055;


        group.add(trunk);

        group.add(leaves);


        group.position.copy(position);

        group.lookAt(0, 0, 0);

        group.rotateX(Math.PI / 2);


        earth.add(group);

    }

}


// ============================================
// MOUNTAIN
// ============================================

function addMountain(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.59);


        const geometry =

            new THREE.ConeGeometry(

                0.12,

                0.3,

                7

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0x777777,

                roughness: 1

            });


        const mountain = new THREE.Mesh(

            geometry,

            material

        );


        mountain.position.copy(position);

        mountain.lookAt(0, 0, 0);


        earth.add(mountain);

    }

}


// ============================================
// DESERT
// ============================================

function addDesert(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.59);


        const geometry =

            new THREE.SphereGeometry(

                0.13,

                8,
                8

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0xc79b52

            });


        const desert = new THREE.Mesh(

            geometry,

            material

        );


        desert.position.copy(position);

        earth.add(desert);

    }

}


// ============================================
// SNOW
// ============================================

function addSnow(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.60);


        const geometry =

            new THREE.SphereGeometry(

                0.09,

                8,
                8

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0xffffff

            });


        const snow = new THREE.Mesh(

            geometry,

            material

        );


        snow.position.copy(position);

        earth.add(snow);

    }

}


// ============================================
// VOLCANO
// ============================================

function addVolcano(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.6);


        const geometry =

            new THREE.ConeGeometry(

                0.13,

                0.18,

                12

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0x3b2520

            });


        const volcano = new THREE.Mesh(

            geometry,

            material

        );


        volcano.position.copy(position);

        volcano.lookAt(0, 0, 0);

        earth.add(volcano);

    }

}


// ============================================
// RIVER
// ============================================

function addRiver(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.59);


        const geometry =

            new THREE.TorusGeometry(

                0.13,
                0.012,
                5,
                20

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0x35aef5

            });


        const river = new THREE.Mesh(

            geometry,

            material

        );


        river.position.copy(position);

        river.lookAt(0, 0, 0);

        earth.add(river);

    }

}


// ============================================
// PLANTS
// ============================================

function addPlants(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.59);


        const geometry =

            new THREE.SphereGeometry(

                0.025,

                6,
                6

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0x63c957

            });


        const plant = new THREE.Mesh(

            geometry,

            material

        );


        plant.position.copy(position);

        earth.add(plant);

    }

}


// ============================================
// ANIMALS
// ============================================

function addAnimals(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.62);


        const geometry =

            new THREE.SphereGeometry(

                0.025,

                8,
                8

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0xd6b070

            });


        const animal = new THREE.Mesh(

            geometry,

            material

        );


        animal.position.copy(position);

        earth.add(animal);

    }

}


// ============================================
// HUMAN
// ============================================

function addHumans(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.63);


        const geometry =

            new THREE.SphereGeometry(

                0.025,

                8,
                8

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0xf0b27a

            });


        const human = new THREE.Mesh(

            geometry,

            material

        );


        human.position.copy(position);

        earth.add(human);

    }

}


// ============================================
// VILLAGE
// ============================================

function addVillage(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const group = new THREE.Group();

        const position = randomSpherePosition(1.63);


        for (let j = 0; j < 3; j++) {

            const geometry =

                new THREE.BoxGeometry(

                    0.035,

                    0.025,

                    0.035

                );


            const material =

                new THREE.MeshStandardMaterial({

                    color: 0xc88a55

                });


            const house = new THREE.Mesh(

                geometry,

                material

            );


            house.position.set(

                (Math.random() - 0.5) * 0.1,

                0,

                (Math.random() - 0.5) * 0.1

            );


            group.add(house);

        }


        group.position.copy(position);

        earth.add(group);

    }

}


// ============================================
// CITY
// ============================================

function addCity(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const group = new THREE.Group();

        const position = randomSpherePosition(1.63);


        for (let j = 0; j < 8; j++) {

            const geometry =

                new THREE.BoxGeometry(

                    0.025,

                    0.07 + Math.random() * 0.08,

                    0.025

                );


            const material =

                new THREE.MeshStandardMaterial({

                    color: 0x8da3bb

                });


            const building = new THREE.Mesh(

                geometry,

                material

            );


            building.position.set(

                (Math.random() - 0.5) * 0.15,

                0,

                (Math.random() - 0.5) * 0.15

            );


            group.add(building);

        }


        group.position.copy(position);

        earth.add(group);

    }

}


// ============================================
// FACTORY
// ============================================

function addFactory(amount = 1) {

    for (let i = 0; i < amount; i++) {

        const position = randomSpherePosition(1.63);


        const geometry =

            new THREE.BoxGeometry(

                0.09,

                0.06,

                0.09

            );


        const material =

            new THREE.MeshStandardMaterial({

                color: 0x666b72

            });


        const factory = new THREE.Mesh(

            geometry,

            material

        );


        factory.position.copy(position);

        earth.add(factory);

    }

}


// ============================================
// TOOL SYSTEM
// ============================================

document.querySelectorAll(".tool").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".tool")
            .forEach(b => b.classList.remove("active"));

        button.classList.add("active");

        selectedTool = button.dataset.tool;

        showMessage(

            "Mode: " + button.innerText

        );

    });

});


// ============================================
// WORLD ACTION
// ============================================

function useTool(tool) {

    switch (tool) {

        case "land":

            addLand(5);

            worldData.vegetation += 1;

            break;


        case "water":

            addWater();

            break;


        case "mountain":

            addMountain(3);

            worldData.mountains += 3;

            break;


        case "forest":

            addForest(8);

            worldData.forests += 8;

            worldData.vegetation += 5;

            break;


        case "desert":

            addDesert(4);

            worldData.deserts += 4;

            break;


        case "snow":

            addSnow(4);

            worldData.snow += 4;

            break;


        case "volcano":

            addVolcano(1);

            worldData.volcanoes++;

            break;


        case "river":

            addRiver(2);

            worldData.rivers += 2;

            break;


        case "plant":

            addPlants(10);

            worldData.plants += 10;

            worldData.vegetation += 3;

            break;


        case "animal":

            addAnimals(8);

            worldData.animals += 8;

            break;


        case "human":

            addHumans(5);

            worldData.population += 5;

            break;


        case "village":

            addVillage(1);

            worldData.villages++;

            worldData.population += 20;

            break;


        case "city":

            addCity(1);

            worldData.cities++;

            worldData.population += 1000;

            break;


        case "factory":

            addFactory(1);

            worldData.factories++;

            break;

    }


    updateStats();

}


// ============================================
// WATER
// ============================================

function addWater() {

    const geometry =

        new THREE.SphereGeometry(

            1.57,

            64,
            64

        );


    const material =

        new THREE.MeshStandardMaterial({

            color: 0x176da6,

            transparent: true,

            opacity: 0.25

        });


    const water = new THREE.Mesh(

        geometry,

        material

    );


    earth.add(water);

}


// ============================================
// CLICK EARTH
// ============================================

rendererReady();

function rendererReady() {

    setTimeout(() => {

        renderer.domElement.addEventListener(

            "click",

            () => {

                useTool(selectedTool);

            }

        );

    }, 1000);

}


// ============================================
// MOUSE ROTATION
// ============================================

world.addEventListener(

    "mousedown",

    event => {

        mouseDown = true;

        previousMouseX = event.clientX;

        previousMouseY = event.clientY;

    }

);


window.addEventListener(

    "mouseup",

    () => {

        mouseDown = false;

    }

);


window.addEventListener(

    "mousemove",

    event => {

        if (!mouseDown) return;


        const deltaX =

            event.clientX - previousMouseX;


        const deltaY =

            event.clientY - previousMouseY;


        earth.rotation.y += deltaX * 0.008;

        earth.rotation.x += deltaY * 0.004;


        atmosphere.rotation.y =

            earth.rotation.y;


        previousMouseX = event.clientX;

        previousMouseY = event.clientY;

    }

);


// ============================================
// ZOOM
// ============================================

world.addEventListener(

    "wheel",

    event => {

        camera.position.z += event.deltaY * 0.002;

        camera.position.z = Math.max(

            2.5,

            Math.min(

                7,

                camera.position.z

            )

        );

    }

);


// ============================================
// TEMPERATURE
// ============================================

document
    .getElementById("temperature")
    .addEventListener("input", event => {

        worldData.temperature =

            Number(event.target.value);


        document
            .getElementById("temperatureValue")
            .innerText =

            worldData.temperature + "°C";


        updateClimate();

    });


// ============================================
// RAIN
// ============================================

document
    .getElementById("rain")
    .addEventListener("input", event => {

        worldData.rain =

            Number(event.target.value);


        document
            .getElementById("rainValue")
            .innerText =

            worldData.rain + "%";


        updateClimate();

    });


// ============================================
// ATMOSPHERE
// ============================================

document
    .getElementById("atmosphere")
    .addEventListener("input", event => {

        worldData.atmosphere =

            Number(event.target.value);


        document
            .getElementById("atmosphereValue")
            .innerText =

            worldData.atmosphere + "%";


        atmosphere.material.opacity =

            0.05 +

            worldData.atmosphere / 1000;

    });


// ============================================
// CLIMATE
// ============================================

function updateClimate() {

    if (worldData.temperature < 0) {

        showMessage(

            "❄️ Suhu rendah! Es mulai meluas."

        );

    }

    else if (worldData.temperature > 35) {

        showMessage(

            "🔥 Suhu tinggi! Risiko kekeringan meningkat."

        );

    }

    else if (worldData.rain > 75) {

        showMessage(

            "🌧️ Curah hujan tinggi! Vegetasi berkembang."

        );

    }

}


// ============================================
// DAY
// ============================================

document
    .getElementById("dayButton")
    .addEventListener("click", () => {

        worldData.day = true;

        scene.background = new THREE.Color(

            0x030712

        );

        showMessage("☀️ Siang hari.");

    });


// ============================================
// NIGHT
// ============================================

document
    .getElementById("nightButton")
    .addEventListener("click", () => {

        worldData.day = false;

        scene.background = new THREE.Color(

            0x000108

        );

        showMessage("🌙 Malam hari.");

    });


// ============================================
// WEATHER
// ============================================

document
    .getElementById("weatherButton")
    .addEventListener("click", () => {

        worldData.weather =

            worldData.weather === "rain"

                ? "normal"

                : "rain";


        if (worldData.weather === "rain") {

            showMessage(

                "🌧️ Hujan turun di seluruh dunia!"

            );

        }

        else {

            showMessage(

                "☀️ Cuaca kembali normal."

            );

        }

    });


// ============================================
// TIMELINE
// ============================================

document
    .getElementById("timeline")
    .addEventListener("input", event => {

        const value = Number(event.target.value);

        worldData.year = value * 1000000;

        document
            .getElementById("timelineValue")
            .innerText =

            formatYear(worldData.year);

        updateEra(value);

    });


function formatYear(year) {

    if (year >= 1000000) {

        return (

            (year / 1000000).toFixed(1)

            + " juta tahun"

        );

    }

    return year + " tahun";

}


function updateEra(value) {

    let era;

    if (value < 15) {

        era = "BUMI AWAL";

    }

    else if (value < 30) {

        era = "KEHIDUPAN AWAL";

    }

    else if (value < 50) {

        era = "ZAMAN PURBA";

    }

    else if (value < 70) {

        era = "PERADABAN";

    }

    else if (value < 90) {

        era = "DUNIA MODERN";

    }

    else {

        era = "MASA DEPAN";

    }


    document
        .getElementById("eraName")
        .innerText = era;

}


// ============================================
// EVOLUTION
// ============================================

document
    .getElementById("evolveButton")
    .addEventListener("click", () => {

        showMessage(

            "🚀 Dunia sedang berevolusi..."

        );


        let steps = 0;


        const evolution = setInterval(() => {

            steps++;


            addPlants(5);

            addAnimals(3);


            if (steps > 5) {

                addHumans(2);

            }


            if (steps > 8) {

                addVillage(1);

            }


            if (steps > 12) {

                addCity(1);

            }


            worldData.vegetation += 2;

            worldData.animals += 3;

            worldData.population += 10;


            updateStats();


            if (steps >= 15) {

                clearInterval(evolution);

                showMessage(

                    "🌍 Evolusi selesai! Dunia berkembang."

                );

            }

        }, 250);

    });


// ============================================
// METEOR
// ============================================

document
    .getElementById("meteorButton")
    .addEventListener("click", () => {

        const geometry =

            new THREE.SphereGeometry(

                0.12,
                16,
                16

            );


        const material =

            new THREE.MeshBasicMaterial({

                color: 0xff5b2e

            });


        const meteor = new THREE.Mesh(

            geometry,

            material

        );


        meteor.position.set(

            4,
            2,
            3

        );


        scene.add(meteor);


        const interval = setInterval(() => {

            meteor.position.multiplyScalar(

                0.93

            );


            if (

                meteor.position.length() < 1.7

            ) {

                clearInterval(interval);

                scene.remove(meteor);


                showMessage(

                    "☄️ Meteor menghantam Bumi!"

                );

                worldData.population =

                    Math.floor(

                        worldData.population * 0.8

                    );

                updateStats();

            }

        }, 30);

    });


// ============================================
// VOLCANO DISASTER
// ============================================

document
    .getElementById("eruptionButton")
    .addEventListener("click", () => {

        showMessage(

            "🌋 Gunung berapi meletus!"

        );


        earth.scale.set(

            1.03,
            1.03,
            1.03

        );


        setTimeout(() => {

            earth.scale.set(

                1,
                1,
                1

            );

        }, 400);

    });


// ============================================
// STORM
// ============================================

document
    .getElementById("stormButton")
    .addEventListener("click", () => {

        showMessage(

            "🌪️ Badai besar melanda dunia!"

        );


        rotationSpeed = 0.03;


        setTimeout(() => {

            rotationSpeed = 0.001;

        }, 3000);

    });


// ============================================
// RESET
// ============================================

document
    .getElementById("resetButton")
    .addEventListener("click", () => {

        if (!confirm(

            "Reset seluruh dunia?"

        )) return;


        while (earth.children.length > 0) {

            earth.remove(

                earth.children[0]

            );

        }


        worldData = {

            vegetation: 0,

            animals: 0,

            population: 0,

            cities: 0,

            villages: 0,

            mountains: 0,

            forests: 0,

            deserts: 0,

            snow: 0,

            volcanoes: 0,

            rivers: 0,

            plants: 0,

            factories: 0,

            temperature: 15,

            rain: 50,

            atmosphere: 80,

            year: 0,

            weather: "normal",

            day: true

        };


        createInitialWorld();

        updateStats();


        document
            .getElementById("timeline")
            .value = 0;


        updateEra(0);


        showMessage(

            "🔄 Bumi berhasil di-reset."

        );

    });


// ============================================
// STATS
// ============================================

function updateStats() {

    document
        .getElementById("vegetation")
        .innerText =

        Math.min(

            100,

            Math.floor(

                worldData.vegetation

            )

        ) + "%";


    document
        .getElementById("animals")
        .innerText =

        worldData.animals;


    document
        .getElementById("population")
        .innerText =

        formatPopulation(

            worldData.population

        );


    document
        .getElementById("cities")
        .innerText =

        worldData.cities;

}


function formatPopulation(number) {

    if (number >= 1000000) {

        return (

            number / 1000000

        ).toFixed(1) + "M";

    }

    if (number >= 1000) {

        return (

            number / 1000

        ).toFixed(1) + "K";

    }

    return number;

}


// ============================================
// MESSAGE
// ============================================

function showMessage(text) {

    const message =

        document.getElementById("message");


    message.innerText = text;

    message.classList.add("show");


    setTimeout(() => {

        message.classList.remove("show");

    }, 2500);

}


// ============================================
// NOTIFICATION
// ============================================

function notify(text) {

    const notification =

        document.getElementById(

            "notification"

        );


    notification.innerText = text;

    notification.classList.add("show");


    setTimeout(() => {

        notification.classList.remove(

            "show"

        );

    }, 2500);

}


// ============================================
// ANIMATION
// ============================================

function animate() {

    requestAnimationFrame(animate);


    if (!mouseDown) {

        earth.rotation.y +=

            rotationSpeed;

    }


    atmosphere.rotation.y +=

        rotationSpeed * 0.5;


    stars.rotation.y +=

        0.00005;


    renderer.render(

        scene,

        camera

    );

}


// ============================================
// RESIZE
// ============================================

window.addEventListener(

    "resize",

    () => {

        camera.aspect =

            world.clientWidth /

            world.clientHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(

            world.clientWidth,

            world.clientHeight

        );

    }

);


// ============================================
// START
// ============================================

init();