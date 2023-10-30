import MeditationIcon from '@/assets/svg-jsx/MeditationIcon.jsx';
import UserIcon from '@/assets/svg-jsx/UserIcon';
import VideoPlusIcon from '@/assets/svg-jsx/VideoPlusIcon.jsx';
import CreateModuleIcon from '@/assets/svg-jsx/CreateModuleIcon.jsx';

import BrainIcon from '@/assets/svg-jsx/BrainIcon.jsx';

export const routes = [
	{
		to: '/dashboard',
		text: 'Dashboard',
		svg: (
			<svg
				width='20'
				height='20'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M0 11.1111H8.88889V0H0V11.1111ZM0 20H8.88889V13.3333H0V20ZM11.1111 20H20V8.88889H11.1111V20ZM11.1111 0V6.66667H20V0H11.1111Z'
					fill='#8F8F8F'
				/>
			</svg>
		),
	},
	{
		to: '/course',
		text: 'Curso',
		svg: (
			<svg
				width='20'
				height='14'
				viewBox='0 0 20 14'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M17 4H0V6H17V4ZM17 0H0V2H17V0ZM0 10H13V8H0V10ZM15 8V14L20 11L15 8Z'
					fill='#8F8F8F'
				/>
			</svg>
		),
	},
	{
		to: '/dashboard/users-section',
		text: 'Usuarios',
		svg: (
			<UserIcon />

		),
	},
	{
		to: '/dashboard/module/create',
		text: 'Crear Módulo',
		svg: (
			<CreateModuleIcon />
		),
	},
	{

		to: '/dashboard/class/create',
		text: 'Crear clase',
		svg: (
			<VideoPlusIcon />
		),
	},
	{
		to: '/dashboard/meditation/create',
		text: 'Crear Meditación',
		svg: (
			<MeditationIcon />
		),
	},
	{
		to: '/dashboard/knowledge',
		text: 'Crear Autorregistro',
		svg: (
			<BrainIcon />
		),
	},
];
