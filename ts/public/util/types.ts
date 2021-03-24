type Constructor<Instance extends {} = {}, Args extends any[] = any[], Static extends {} = {}> = (new (...args: Args) => Instance) & Static;
type ConstructorArgs<C extends Constructor> = C extends new (...args: (infer T)) => any ? T : never;
type ChildClass<Parent extends Constructor, Args extends any[] = ConstructorArgs<Parent>, Static extends {} = {}> = Constructor<InstanceType<Parent>, Args, Static>;
type UnionToIntersection<T> =
	(T extends any ? (x: T) => any : never) extends
	(x: infer R) => any ? R : never;

type JSONObject = Record<string, any> | any[];
type NonNullUndefined<T> = Exclude<T, null | undefined>;
