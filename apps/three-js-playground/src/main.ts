import "./style.css";
import * as THREE from "three";

class App {
	private renderer: THREE.WebGLRenderer;
	private domApp: Element;
	private scene: THREE.Scene;
	private camera?: THREE.PerspectiveCamera;
	private cube?: THREE.Mesh;

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
		this.camera.position.z = 2;
	}

	private setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);

		this.scene.add(light);
	}

	private setupModels() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);
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

		const cube = this.cube;

		if (cube) {
			cube.rotation.x = time;
			cube.rotation.y = time;
		}
	}

	private render(time: number) {
		this.update(time);
		this.renderer.render(this.scene, this.camera!);
	}
}

new App();
