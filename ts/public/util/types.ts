type Constructor<Instance extends {} = {}, Args extends any[] = any[]> = new (...args: Args) => Instance;
type UnionToIntersection<T> =
	(T extends any ? (x: T) => any : never) extends
	(x: infer R) => any ? R : never;
namespace JSONObject {
	export type RawValue = string | number | boolean;
	export type Value = RawValue | Record<string, RawValue> | RawValue[];
}
type JSONObject = JSONObject.Value | Record<string, JSONObject.Value> | JSONObject.Value[];