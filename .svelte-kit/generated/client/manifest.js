export { matchers } from './matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')];

export const server_loads = [];

export const dictionary = {
	"/(app)": [4,[2]],
	"/(app)/menu": [5,[2]],
	"/mobile": [9,[3]],
	"/mobile/menu": [10,[3]],
	"/mobile/users": [13,[3]],
	"/mobile/user/join": [11,[3]],
	"/mobile/user/login": [12,[3]],
	"/privacy": [14],
	"/(app)/users": [8,[2]],
	"/(app)/user/join": [6,[2]],
	"/(app)/user/login": [7,[2]]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};