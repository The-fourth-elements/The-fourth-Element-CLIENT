import Sidebar from '@/components/sidebarDashboard/Sidebar';
import { Dashboard } from '@/styles/dashboard.module.scss';

const layout = ({ children }) => {
	return (
		<>
			<Sidebar />
			<div className={Dashboard}>{children}</div>
		</>
	);
};

export default layout;
