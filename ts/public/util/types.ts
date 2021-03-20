type Constructor<Instance extends {} = {}, Args extends any[] = any[]> = new (...args: Args) => Instance;
type UnionToIntersection<T> =
	(T extends any ? (x: T) => any : never) extends
	(x: infer R) => any ? R : never;

type JSONObject = Record<string, any>;