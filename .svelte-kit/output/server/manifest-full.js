export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/food_img/KjdgrhOok.png","images/food_img/berger_1.jpg","images/food_img/berger_2.jpg","images/food_img/berger_3.jpg","images/food_img/main_1.jpg","images/food_img/main_10.jpg","images/food_img/main_11.jpg","images/food_img/main_12.jpg","images/food_img/main_13.jpg","images/food_img/main_14.jpg","images/food_img/main_2.jpg","images/food_img/main_3.jpg","images/food_img/main_4.jpg","images/food_img/main_5.jpg","images/food_img/main_6.jpg","images/food_img/main_7.jpg","images/food_img/main_8.jpg","images/food_img/main_9.jpg","images/food_img/pasta2.jpg","images/food_img/pasta_1.jpg","images/food_img/pasta_10.jpg","images/food_img/pasta_2.jpg","images/food_img/pasta_3.jpg","images/food_img/pasta_4.jpg","images/food_img/pasta_5.jpg","images/food_img/pasta_6.jpg","images/food_img/pasta_7.jpg","images/food_img/pasta_8.jpg","images/food_img/pasta_9.jpg","images/food_img/pizza_1.jpg","images/food_img/pizza_10.jpg","images/food_img/pizza_2.jpg","images/food_img/pizza_3.jpg","images/food_img/pizza_4.jpg","images/food_img/pizza_5.jpg","images/food_img/pizza_6.jpg","images/food_img/pizza_7.jpg","images/food_img/pizza_8.jpg","images/food_img/pizza_9.jpg","images/food_img/salad_1.jpg","images/food_img/salad_10.jpg","images/food_img/salad_11.jpg","images/food_img/salad_2.jpg","images/food_img/salad_3.jpg","images/food_img/salad_4.jpg","images/food_img/salad_5.jpg","images/food_img/salad_6.jpg","images/food_img/salad_7.jpg","images/food_img/salad_8.jpg","images/food_img/salad_9.jpg","images/github.svg","images/noImage.jpg","images/svelte-logo.svg","images/svelte-welcome.png","images/svelte-welcome.webp","robots.txt"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".webp":"image/webp",".txt":"text/plain"},
	_: {
		entry: {"file":"_app/immutable/start-d9670b07.js","imports":["_app/immutable/start-d9670b07.js","_app/immutable/chunks/index-3412e559.js","_app/immutable/chunks/singletons-d1c1604e.js","_app/immutable/chunks/index-ba4a39d3.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/menu",
				pattern: /^\/menu\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/user/join",
				pattern: /^\/user\/join\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/user/login",
				pattern: /^\/user\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
