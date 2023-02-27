export { matchers } from './matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8')];

export const server_loads = [];

export const dictionary = {
	"/(app)": [3,[2]],
	"/(app)/menu": [4,[2]],
	"/privacy": [8],
	"/(app)/users": [7,[2]],
	"/(app)/user/join": [5,[2]],
	"/(app)/user/login": [6,[2]]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};