import Input from "./Input.js";
import Loader from "./Loader.js";

export interface Preloadable {
	preload(loader: Loader): Promise<void>;
}
export interface Updatable {
	update(input: Input): void;
}
export interface Renderable {
	render(ctx: CanvasRenderingContext2D): void;
}