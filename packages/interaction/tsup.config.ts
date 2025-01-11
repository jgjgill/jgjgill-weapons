import { defineConfig } from "tsup";

export default defineConfig({
	loader: {
		".jpg": "dataurl",
		".glb": "dataurl",
	},
});
