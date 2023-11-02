import { cardsModules } from '@/data-mock/data-modules';
import ModuleCardLanding from './ModuleCardLanding';
import { CardsContainer } from './styles.module.scss';
import React from 'react'

const ModulesCardsLanding = () => {
	return (
		<div className={CardsContainer}>
			{cardsModules.map(({ subtitle, content, id }, index) => {
                
				// if (!((index + 1) % 3) || !((index + 1) % 6) || !((index + 1) % 9)) {
				// 	return (
				// 		<React.Fragment key={id}>
				// 			<ModuleCardLanding
				// 				content={content}
				// 				subtitle={subtitle}
				// 				moduleNumber={index}
				// 				img={true}></ModuleCardLanding>
				// 			<hr />
				// 		</React.Fragment>
				// 	);
				// }
				return (
					<React.Fragment key={id}>
						<ModuleCardLanding
							content={content}
							subtitle={subtitle}
							moduleNumber={index}
							img={true}></ModuleCardLanding>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default ModulesCardsLanding;
