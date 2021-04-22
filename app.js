// variables setup

let container;
let camera;
let scene;
let renderer;
let model;

let offsetX = 0;
let offsetY = 0;

function init () {
    container = document.querySelector('.scene');
    scene =  new THREE.Scene();
    
    const fov = 55;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    // camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 1, 10);

    const ambient = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xaaaaaa, 1);
    light.position.set(1, 3, 10);
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
        model = gltf.scene.children[2];
        model.rotation.y = 1.8;
        animate();
    });
}

function animate (){
    requestAnimationFrame(animate);
    model.rotation.y += offsetX / 20;
    model.rotation.x += offsetY / 20;
    renderer.render(scene, camera);
}

init();

container.addEventListener('mousemove', e => {
    offsetX = (e.clientX / container.clientWidth) - 0.5;
    offsetY = (e.clientY / container.clientHeight) - 0.5;
    return;
})