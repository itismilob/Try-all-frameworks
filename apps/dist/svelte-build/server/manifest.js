const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.D_1wQebz.js",app:"_app/immutable/entry/app.CZBdaOVQ.js",imports:["_app/immutable/entry/start.D_1wQebz.js","_app/immutable/chunks/D7IrhsA3.js","_app/immutable/chunks/CkhXREui.js","_app/immutable/chunks/DQONMn_k.js","_app/immutable/entry/app.CZBdaOVQ.js","_app/immutable/chunks/CkhXREui.js","_app/immutable/chunks/DQkueo3U.js","_app/immutable/chunks/DzRGIKil.js","_app/immutable/chunks/BYyH9hsh.js","_app/immutable/chunks/DQONMn_k.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CyJnplPZ.js')),
			__memo(() => import('./chunks/1-Dc4vDqFV.js')),
			__memo(() => import('./chunks/2-BMPOEWHV.js')),
			__memo(() => import('./chunks/3-CMbLz1Os.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/content/[id]",
				pattern: /^\/content\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
