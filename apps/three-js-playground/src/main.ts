import {
	OrbitControls,
	RGBELoader,
	RectAreaLightHelper,
	RectAreaLightUniformsLib,
} from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

class App {
	private renderer: THREE.WebGLRenderer;
	private domApp: Element;
	private scene: THREE.Scene;
	private camera?: THREE.PerspectiveCamera;

	/*
	private light?: THREE.DirectionalLight;
	private helper?: THREE.DirectionalLightHelper;
	*/

	/*
	private light?: THREE.PointLight;
	private helper?: THREE.PointLightHelper;
	*/

	private light?: THREE.SpotLight;
	private helper?: THREE.SpotLightHelper;

	constructor() {
		//  계단 현상(jagged edges)을 줄이기 위해 사용하는 기술
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		// 고해상도 모니터에서 좋게 보이기 위해 픽셀 비율 설정, 2보다 픽셀 비율 크게 설정해도 사람이 봐도 파악 어려움, 성능에도 안좋음
		this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
		this.renderer.shadowMap.enabled = true;

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
		// const light = new THREE.AmbientLight("#ffffff", 0.1);
		// const light = new THREE.HemisphereLight("#b0d8f5", "#bb7a1c", 1);
		// DirectionalLight 광원
		/*
		const light = new THREE.DirectionalLight(0xffffff, 5);
		light.castShadow = true;
		light.position.set(0, 3, 0);
		light.target.position.set(0, 0, 0);

		this.scene.add(light.target);
		this.light = light;
		this.scene.add(light);

		light.shadow.camera.top = 5;
		light.shadow.camera.bottom = -5;
		light.shadow.camera.left = -5;
		light.shadow.camera.right = 5;
		light.shadow.camera.near = 0.5;
		light.shadow.camera.far = 500;

		light.shadow.mapSize.set(2048, 2048); // 그림자 품질 관련 코드
		light.shadow.radius = 4;

		const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
		this.scene.add(cameraHelper);

		const helper = new THREE.DirectionalLightHelper(light);
		this.helper = helper;

		this.scene.add(helper);
		*/

		// PointLight 광원

		/*
		const light = new THREE.PointLight(0xffffff, 5);
		light.castShadow = true;
		light.position.set(0, 5, 0);
		light.distance = 10;
		this.scene.add(light);
		this.light = light;

		const helper = new THREE.PointLightHelper(light);
		this.helper = helper;

		this.scene.add(helper);
		*/

		// SpotLight 광원

		const light = new THREE.SpotLight(0xffffff, 10);
		light.shadow.mapSize.set(2048, 2048);
		light.shadow.radius = 32;
		light.position.set(0, 2.5, 0);
		light.castShadow = true;
		light.target.position.set(0, 0, 0);
		light.angle = THREE.MathUtils.degToRad(30);
		light.penumbra = 0.1;
		this.scene.add(light);
		this.scene.add(light.target);

		const helper = new THREE.SpotLightHelper(light);
		this.scene.add(helper);

		this.light = light;
		this.helper = helper;

		const gui = new GUI();
		gui
			.add(light, "angle", 0, Math.PI / 2, 0.01)
			.onChange(() => helper.update());
		gui.add(light, "penumbra", 0, 1, 0.01).onChange(() => helper.update());

		/*
		RectAreaLightUniformsLib.init();
		const light = new THREE.RectAreaLight(0xffffff, 10, 3, 0.5);
		light.position.set(0, 5, 0);
		light.rotation.x = THREE.MathUtils.degToRad(-90);
		this.scene.add(light);

		const helper = new RectAreaLightHelper(light);
		light.add(helper);
		*/
		// HDR Image 광원
		/*
		new RGBELoader().load("./hayloft_2k.hdr", (texture) => {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			this.scene.environment = texture; // 광원
			this.scene.background = texture; // 배경

			this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
			this.renderer.toneMappingExposure = 0.4;
		});
		*/
	}

	private setupModels() {
		const axisHelper = new THREE.AxesHelper(10);
		this.scene.add(axisHelper);

		const geomGround = new THREE.PlaneGeometry(5, 5);
		const matGround = new THREE.MeshStandardMaterial({
			color: "#2c3e50",
			roughness: 0.5,
			metalness: 0.5,
			side: THREE.DoubleSide,
		});
		const ground = new THREE.Mesh(geomGround, matGround);
		ground.rotation.x = -THREE.MathUtils.degToRad(90);
		ground.position.y = -0.5;
		ground.receiveShadow = true;
		// ground.castShadow = true

		this.scene.add(ground);

		// const geomBigSphere = new THREE.SphereGeometry(
		// 	1,
		// 	32,
		// 	16,
		// 	0,
		// 	THREE.MathUtils.degToRad(360),
		// 	0,
		// 	THREE.MathUtils.degToRad(90),
		// );
		const geomBigSphere = new THREE.TorusKnotGeometry(0.55, 0.15, 128, 64);
		geomBigSphere.translate(0, 1, 0);
		const matBigSphere = new THREE.MeshStandardMaterial({
			color: "#ffffff",
			roughness: 0,
			metalness: 0.2,
		});
		const bigSphere = new THREE.Mesh(geomBigSphere, matBigSphere);
		bigSphere.position.y = -0.5;
		bigSphere.receiveShadow = true;
		bigSphere.castShadow = true;

		this.scene.add(bigSphere);

		const geomSmallSphere = new THREE.SphereGeometry(0.2);
		const matSmallSphere = new THREE.MeshStandardMaterial({
			color: "#e74c3c",
			roughness: 0.2,
			metalness: 0.5,
		});
		const smallSphere = new THREE.Mesh(geomSmallSphere, matSmallSphere);

		const smallSpherePivot = new THREE.Object3D();
		smallSpherePivot.add(smallSphere);
		bigSphere.add(smallSpherePivot);

		smallSphere.position.x = 2;
		smallSphere.receiveShadow = true;
		smallSphere.castShadow = true;

		smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(-45);
		smallSpherePivot.position.y = 0.5;
		smallSpherePivot.name = "smallSpherePivot";

		const cntItems = 8;
		const geomTorus = new THREE.TorusGeometry(0.3, 0.1);
		const matTorus = new THREE.MeshStandardMaterial({
			color: "#9b59b5",
			roughness: 0.5,
			metalness: 0.9,
		});

		for (let i = 0; i < cntItems; i++) {
			const torus = new THREE.Mesh(geomTorus, matTorus);
			torus.receiveShadow = true;
			torus.castShadow = true;

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

			const smallSphere = smallSpherePivot.children[0];

			if (this.light! instanceof THREE.DirectionalLight) {
				smallSphere.getWorldPosition(this.light!.target.position);
				this.helper!.update();
			}

			if (this.light! instanceof THREE.PointLight) {
				smallSphere.getWorldPosition(this.light!.position);
				this.helper!.update();
			}

			if (this.light! instanceof THREE.SpotLight) {
				smallSphere.getWorldPosition(this.light!.target.position);
				this.helper!.update();
			}

			/*
			smallSphere.getWorldPosition(this.light!.target.position);
			this.helper!.update();
			*/

			// smallSphere.getWorldPosition(this.light!.position);
			// this.helper!.update();

			/*
			// SpotLight
			smallSphere.getWorldPosition(this.light!.target.position);
			this.helper!.update();
			*/
		}
	}

	private render(time: number) {
		this.update(time);
		this.renderer.render(this.scene, this.camera!);
	}
}

new App();
