import Sidebar from '@/components/sidebarDashboard/Sidebar';
import { Dashboard } from '@/styles/dashboard.module.scss';

const layout = ({ children }) => {
	return (
		<>
			<Sidebar />
			<main className={Dashboard}>{children}</main>
		</>
	);
};

export default layout;
