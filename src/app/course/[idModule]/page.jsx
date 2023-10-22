import Categories from '@/components/Categories/Categories';
import React from 'react';

function page({ params }) {
	const { idModule } = params;
	//renderiza independientemente de si es ://meditacion,  ejercicios, clases
	return <Categories idModule={idModule} children={<p>holi</p>} />; 
}

export default page;
