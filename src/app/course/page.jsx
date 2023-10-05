'use client';

import MercadoPago from '@/components/MercadoPago/MercadoPago';
import ModuleView from '@/components/modulesView/ModulesView';
import User from '@/components/user/User';
import { useSession } from 'next-auth/react';

const page = () => {
	const { data: session } = useSession();
	const role = session?.token?.user?.role;
	return (
		<main>
			<ModuleView></ModuleView>
			<User></User>
			{role < 1 && <MercadoPago />}
		</main>
	);
};

export default page;
