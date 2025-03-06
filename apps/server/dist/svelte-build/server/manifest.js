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
		client: {start:"_app/immutable/entry/start.B73nTN6P.js",app:"_app/immutable/entry/app.DhMzGTm3.js",imports:["_app/immutable/entry/start.B73nTN6P.js","_app/immutable/chunks/CbGuGfhK.js","_app/immutable/chunks/H5THvfYN.js","_app/immutable/chunks/paxaZGAW.js","_app/immutable/entry/app.DhMzGTm3.js","_app/immutable/chunks/H5THvfYN.js","_app/immutable/chunks/C7Gr8Hc1.js","_app/immutable/chunks/DkFVLFqZ.js","_app/immutable/chunks/BmyBH7a9.js","_app/immutable/chunks/ClanTBNt.js","_app/immutable/chunks/DQ4Qeime.js","_app/immutable/chunks/paxaZGAW.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-HAwRkuR4.js')),
			__memo(() => import('./chunks/1-Bl4Xhcte.js')),
			__memo(() => import('./chunks/2-Csk50h0-.js')),
			__memo(() => import('./chunks/3-Df-tiLQg.js')),
			__memo(() => import('./chunks/4-BYZuYOiF.js')),
			__memo(() => import('./chunks/5-tWpXVo84.js'))
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
			},
			{
				id: "/not-auth",
				pattern: /^\/not-auth\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/write",
				pattern: /^\/write\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
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
