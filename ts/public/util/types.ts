type Constructor<Instance extends {} = {}, Args extends any[] = any[], Static extends {} = {}> = (new (...args: Args) => Instance) & Static;
type UnionToIntersection<T> =
	(T extends any ? (x: T) => any : never) extends
	(x: infer R) => any ? R : never;

type JSONObject = Record<string, any> | any[];
type NonNullUndefined<T> = Exclude<T, null | undefined>;