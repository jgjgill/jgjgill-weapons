import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

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
		this.camera.position.z = 5;

		new OrbitControls(this.camera, this.domApp as HTMLElement);
	}

	private setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);

		this.scene.add(light);
	}

	private setupModels() {
		const axisHelper = new THREE.AxesHelper(10);
		this.scene.add(axisHelper);

		const geomGround = new THREE.PlaneGeometry(5, 5);
		const matGround = new THREE.MeshStandardMaterial();
		const ground = new THREE.Mesh(geomGround, matGround);

		ground.rotation.x = -THREE.MathUtils.degToRad(90);
		ground.position.y = -0.5;

		this.scene.add(ground);

		const geomBigSphere = new THREE.SphereGeometry(
			1,
			32,
			16,
			0,
			THREE.MathUtils.degToRad(360),
			0,
			THREE.MathUtils.degToRad(90),
		);
		const matBigSphere = new THREE.MeshStandardMaterial();
		const bigSphere = new THREE.Mesh(geomBigSphere, matBigSphere);
		bigSphere.position.y = -0.5;

		this.scene.add(bigSphere);

		const geomSmallSphere = new THREE.SphereGeometry(0.2);
		const matSmallSphere = new THREE.MeshStandardMaterial();
		const smallSphere = new THREE.Mesh(geomSmallSphere, matSmallSphere);

		const smallSpherePivot = new THREE.Object3D();
		smallSpherePivot.add(smallSphere);
		bigSphere.add(smallSpherePivot);

		smallSphere.position.x = 2;
		smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(-45);
		smallSpherePivot.position.y = 0.5;
		smallSpherePivot.name = "smallSpherePivot";

		const cntItems = 8;
		const geomTorus = new THREE.TorusGeometry(0.3, 0.1);
		const matTorus = new THREE.MeshStandardMaterial();

		for (let i = 0; i < cntItems; i++) {
			const torus = new THREE.Mesh(geomTorus, matTorus);
			const torusPivot = new THREE.Object3D();

			torusPivot.add(torus);
			bigSphere.add(torusPivot);

			torus.position.x = 2;
			torusPivot.position.y = 0.5;
			torusPivot.rotation.y = (THREE.MathUtils.degToRad(360) / cntItems) * i;
		}
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

		const smallSpherePivot = this.scene.getObjectByName("smallSpherePivot");

		if (smallSpherePivot) {
			// smallSpherePivot.rotation.y = time;
			const euler = new THREE.Euler(0, time, 0);
			const quaterion = new THREE.Quaternion().setFromEuler(euler);
			smallSpherePivot.setRotationFromQuaternion(quaterion);

			// smallSpherePivot.quaternion.setFromEuler(euler);
		}
	}

	private render(time: number) {
		this.update(time);
		this.renderer.render(this.scene, this.camera!);
	}
}

new App();
