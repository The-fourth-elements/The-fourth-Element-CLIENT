import './styles.scss';
import {sidebarAdmin} from  '@/utils/navigation';
import Link from 'next/link';

const Sidebar = () => {
	return (
		<>
			<nav className='Sidebar'>
				<ul className='Sidebar__ul'>
          {sidebarAdmin.map(({label, route}, index)=>{
            return (
              <li key={index} className='Sidebar__ul--li'>
                <Link className='Sidebar__ul--li-a' href={route}>{label}</Link>
              </li>
            )
          })}
        </ul>
			</nav>
		</>
	);
};

export default Sidebar;
