/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Box, Dice } from "@jgjgill/interaction";
import { OrbitControls } from "@react-three/drei";
import MyElement3D from "./MyElement3D";

function App() {
	return (
		<Canvas
			shadows
			style={{
				background: "black",
			}}
			camera={{ position: [2, 2, 2] }}
		>
			<Dice
				position={[-2, 0, 0]}
				onFinish={(value) => {
					console.log(value);
				}}
			/>
			<Box position={[2, 0, 0]} />
			<OrbitControls autoRotate />

			<ambientLight intensity={0.5} />
			<pointLight position={[1, 1, 1]} />

			{/* <MyElement3D /> */}
		</Canvas>
	);
}

export default App;
