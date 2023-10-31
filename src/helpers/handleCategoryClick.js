export function handleCategoryClick(
	item,
	moduleId,
	moduleIndex,
	moduleName,
	router
) {
	// Guarda los valores en el localStorage
	localStorage.setItem('category', item);
	localStorage.setItem('moduleId', moduleId);
	localStorage.setItem('moduleIndex', moduleIndex);
	localStorage.setItem('moduleName', moduleName);

	router.push(`/course/module/${item}`);
}