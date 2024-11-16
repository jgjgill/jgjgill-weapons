import { AsciiEffect, OrbitControls } from "three/examples/jsm/Addons.js";
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
		this.camera = new THREE.PerspectiveCamera(
			75, // Fov
			width / height, // Aspect, resize 함수에서도 camera.aspect로 적용
			0.1, // zNear
			100, // zFar
		);

		// const aspect = width / height;
		// this.camera = new THREE.OrthographicCamera(
		// 	-1 * aspect, // xLeft
		// 	1 * aspect, // xRight
		// 	1, // yTop
		// 	-1, // yBottom
		// 	0.1, // zNear
		// 	100, // zFar
		// );

		// this.camera.zoom = 0.2;

		this.camera.position.set(2, 2, 3.5);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		// new OrbitControls(this.camera, this.domApp as HTMLElement);
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
		const matGround = new THREE.MeshStandardMaterial({
			color: "#2c3e50",
			roughness: 0.5,
			metalness: 0.5,
			side: THREE.DoubleSide,
		});
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
		const matBigSphere = new THREE.MeshStandardMaterial({
			color: "#ffffff",
			roughness: 0,
			metalness: 0.2,
		});
		const bigSphere = new THREE.Mesh(geomBigSphere, matBigSphere);
		bigSphere.position.y = -0.5;

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
		smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(-45);
		smallSpherePivot.position.y = 0.5;
		smallSpherePivot.name = "smallSpherePivot";

		// 새로운 빨간색 구를 추가
		// const smallSphere2 = new THREE.Mesh(geomSmallSphere, matSmallSphere);
		const smallSphere2 = new THREE.Object3D();

		const smallSpherePivot2 = new THREE.Object3D();
		smallSpherePivot2.add(smallSphere2);
		bigSphere.add(smallSpherePivot2);
		smallSphere2.position.x = 2;
		smallSpherePivot2.rotation.y = THREE.MathUtils.degToRad(-45);
		smallSpherePivot2.position.y = 0.5;
		smallSpherePivot2.name = "targetPivot";

		const cntItems = 8;
		const geomTorus = new THREE.TorusGeometry(0.3, 0.1);
		const matTorus = new THREE.MeshStandardMaterial({
			color: "#9b59b5",
			roughness: 0.5,
			metalness: 0.9,
		});

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
			// const aspect = width / height;

			// camera.left = -1 * aspect;
			// camera.right = 1 * aspect;

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

			const redSphere = smallSpherePivot.children[0];
			const redSpherePos = new THREE.Vector3();
			redSphere.getWorldPosition(redSpherePos);

			// this.camera?.lookAt(redSpherePos);
			this.camera?.position.copy(redSpherePos);

			const smallSpherePivot2 = this.scene.getObjectByName("targetPivot");
			if (smallSpherePivot2) {
				const euler2 = new THREE.Euler(
					0,
					time + THREE.MathUtils.degToRad(10),
					0,
				);
				const quaterion2 = new THREE.Quaternion().setFromEuler(euler2);
				smallSpherePivot2.setRotationFromQuaternion(quaterion2);

				const nextPos = smallSpherePivot2.children[0];
				const cameraTarget = new THREE.Vector3();
				nextPos.getWorldPosition(cameraTarget);
				this.camera?.lookAt(cameraTarget);
			}
		}
	}

	private render(time: number) {
		this.update(time);
		this.renderer.render(this.scene, this.camera!);
	}
}

new App();
