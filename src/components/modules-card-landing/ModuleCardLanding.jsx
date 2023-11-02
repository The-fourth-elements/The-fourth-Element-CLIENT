import { modulesSvg } from '@/utils/modules-svg';
import { Card, cardSubtitle, cardModule } from './styles.module.scss';

const ModuleCardLanding = ({ subtitle, content, img ,moduleNumber }) => {
  return (
    <section className={Card}>
        {modulesSvg[moduleNumber]()}
        <h2 className={cardModule}>Módulo {moduleNumber + 1}</h2>
        <h2 className={cardSubtitle}>{subtitle}</h2>
        <p>{content}</p>
    </section>
  )
}

export default ModuleCardLanding