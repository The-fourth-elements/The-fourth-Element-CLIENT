'use client'

import { setCookie } from 'cookies-next';

export function handleCategoryClick(
	item,
	moduleId,
	moduleIndex,
	moduleName,
	router
) {
	setCookie('moduleId', moduleId)
	setCookie('moduleIndex', moduleIndex);
	setCookie('moduleName', moduleName);


	router.push(`/course/module/${item}`);
}