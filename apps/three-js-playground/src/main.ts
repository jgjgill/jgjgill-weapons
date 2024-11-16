import {
	OrbitControls,
	RGBELoader,
	VertexNormalsHelper,
} from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

class App {
	private renderer: THREE.WebGLRenderer;
	private domApp: Element;
	private scene: THREE.Scene;
	private camera?: THREE.PerspectiveCamera;

	constructor() {
		//  계단 현상(jagged edges)을 줄이기 위해 사용하는 기술
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		// 고해상도 모니터에서 좋게 보이기 위해 픽셀 비율 설정, 2보다 픽셀 비율 크게 설정해도 사람이 봐도 파악 어려움, 성능에도 안좋음
		this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

		this.domApp = document.querySelector("#app")!;
		// 캔버스 타입의 DOM 객체
		this.domApp.appendChild(this.renderer.domElement);

		this.scene = new THREE.Scene();

		this.setupCamera();
		this.setupLight();
		this.setupModels();
		this.setupEvents();
	}

	private setupCamera() {
		const width = this.domApp.clientWidth;
		const height = this.domApp.clientHeight;

		// width / height: 카메라 렌즈의 가로에 대한 세로 비율값
		this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		this.camera.position.z = 4;

		new OrbitControls(this.camera, this.domApp as HTMLElement);
	}

	private setupLight() {
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 2, 1);
		this.scene.add(light);

		const rgbeLoader = new RGBELoader();
		rgbeLoader.load("./photo_studio_broadway_hall_2k.hdr", (environmentMap) => {
			environmentMap.mapping = THREE.EquirectangularReflectionMapping;
			this.scene.background = environmentMap;
			this.scene.environment = environmentMap;
		});
	}

	private setupModels() {
		const textureLoader = new THREE.TextureLoader();
		const textureCard = textureLoader.load("./og-image.png");

		const map = textureLoader.load("./Glass_Window_002_basecolor.jpg");
		map.colorSpace = THREE.SRGBColorSpace;

		const mapAO = textureLoader.load("./Glass_Window_002_ambientOcclusion.jpg");
		const mapHeight = textureLoader.load("./Glass_Window_002_height.png");
		const mapNormal = textureLoader.load("./Glass_Window_002_normal.jpg");
		const mapRoughness = textureLoader.load("./Glass_Window_002_roughness.jpg");
		const mapMetalic = textureLoader.load("./Glass_Window_002_metallic.jpg");
		const mapAlpha = textureLoader.load("./Glass_Window_002_opacity.jpg");

		const material = new THREE.MeshStandardMaterial({
			map: map,
			normalMap: mapNormal,
			normalScale: new THREE.Vector2(10, 10),
			displacementMap: mapHeight,
			displacementScale: 0.2,
			displacementBias: -0.15,
			aoMap: mapAO,
			aoMapIntensity: 1.5,
			roughnessMap: mapRoughness,
			roughness: 0.8,
			metalnessMap: mapMetalic,
			metalness: 0.9,
			alphaMap: mapAlpha,
			transparent: true,
			side: THREE.DoubleSide,
		});

		const materialCard = new THREE.MeshStandardMaterial({
			map: textureCard,
			side: THREE.DoubleSide,
		});
		textureCard.colorSpace = THREE.SRGBColorSpace;

		const geomePlane = new THREE.BoxGeometry(9, 5, 0.1);
		const plane = new THREE.Mesh(geomePlane, materialCard);
		plane.position.x = -8;
		this.scene.add(plane);

		const geomBox = new THREE.BoxGeometry(1, 1, 1, 256, 256, 256);
		const box = new THREE.Mesh(geomBox, material);
		box.position.x = -1;
		this.scene.add(box);

		const geomSphere = new THREE.SphereGeometry(0.6, 512, 256);
		const sphere = new THREE.Mesh(geomSphere, material);
		sphere.position.x = 1;
		this.scene.add(sphere);

		// const boxHelper = new VertexNormalsHelper(box, 0.1, 0xffff00);
		// this.scene.add(boxHelper);

		// const sphereHelper = new VertexNormalsHelper(sphere, 0.1, 0xffff00);
		// this.scene.add(sphereHelper);
	}

	private setupEvents() {
		window.onresize = this.resize.bind(this);
		this.resize();

		this.renderer.setAnimationLoop(this.render.bind(this));
	}

	private resize() {
		const width = this.domApp.clientWidth;
		const height = this.domApp.clientHeight;

		const camera = this.camera;

		if (camera) {
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		}

		this.renderer.setSize(width, height);
	}

	private update(time: number) {
		time *= 0.001;
	}

	private render(time: number) {
		this.update(time);
		this.renderer.render(this.scene, this.camera!);
	}
}

new App();
