// variables setup

let container;
let camera;
let scene;
let renderer;
let sphere;
let cube;

let offsetX = 0;
let offsetY = 0;

let light;
let lightHue = 0;

function init () {
    container = document.querySelector('.scene');
    scene =  new THREE.Scene();
    
    const fov = 55;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    // camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 7);

    const ambient = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambient);

    light = new THREE.DirectionalLight(`hsl(${lightHue}, 100%, 50%)`, 6);
    light.position.set(-10, 2, 5);
    scene.add(light);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // loading model 
    let loader = new THREE.GLTFLoader();
    loader.load('./3D/untitled.gltf', function(gltf) {
        scene.add(gltf.scene);
        sphere = gltf.scene.children[0];
        sphere.material.color.setHex(0x1111ff);
        cube = gltf.scene.children[1];
        cube.material.color.setHex(0xd6dc38);
        console.log(light);
        sphere.rotation.y = 1.8;
        cube.rotation.x = 0.5;
        animate();
    });
}

function animate (){
    requestAnimationFrame(animate);
    lightHue += 0.001;
    light.color.setHSL(lightHue, 1, 0.5);
    cube.rotation.y += offsetX / 20/* 0.002 */;
    cube.rotation.x += offsetY / 20;
    renderer.render(scene, camera);
}

init();

container.addEventListener('mousemove', e => {
    offsetX = (e.clientX / container.clientWidth) - 0.5;
    offsetY = (e.clientY / container.clientHeight) - 0.5;
    sphere.rotation.y = offsetX * 2;
    sphere.rotation.x = offsetY * 2;
    return;
})