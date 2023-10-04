'use client'

import MercadoPago from "@/components/MercadoPago/MercadoPago";
import ModuleView from "@/components/modulesView/ModulesView";
import User from "@/components/user/User";



const page = () => {


	return(
		<main>
			<ModuleView></ModuleView>
			<User></User>
			<MercadoPago></MercadoPago>
		</main>
	)
};

export default page;
