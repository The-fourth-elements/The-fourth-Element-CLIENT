'use client';
import './AutoRegistroFilters.scss';
import { useState } from 'react';
import { handleSelectFilterAuto } from '@/helpers/handleSelectAutoFilters';
import { Select, SelectItem } from '@nextui-org/react';
import { ScrollShadow } from "@nextui-org/react";

import UserRecords from '@/features/user/knowledge/UserRecords';

const AutoRegistroFilters = responses => {
  const [valueSelect, setValueSelect] = useState('todos');
  const [placeholder, setPlaceholder] = useState('Seleccione un filtro');
  const [forceUpdate, setForceUpdate] = useState(0); // Nuevo estado
  const [rotate, setRotate] = useState(false);

  let [responsesToShow, setResponsesToShow] = useState(responses?.responses);
  let [responsesToCheck, setResponsesToCheck] = useState(responses?.responses);

  const handleToCheckAutoRegistro = id => {
    const responsesFiltered = responses?.responses?.filter(
      newResponse => newResponse._id === id
    );
    setResponsesToShow(responsesFiltered);
    console.log('responsesFiltered ', responsesFiltered);
    setPlaceholder('Seleccione un filtro'); // Cambiamos el placeholder
    setForceUpdate(prev => prev + 1); // Incrementamos el estado para forzar el renderizado
    setRotate(true);
  };

  return (
    <section className='autoRegistroFilters'>
      <header>
        <h2 className=''>Conoce tus autoregistros</h2>
      </header>
          <label htmlFor='select' className='self-center'>Filtrar Autoregistros</label>
          <Select
            key={forceUpdate} // Utilizamos el estado para forzar el renderizado
            value={valueSelect}
            className='selectAutoRegistros col-start-3 col-end-4 max-[768px]:col-start-1 '
            aria-label='Seleccione un filtro'
            placeholder={placeholder}
            onChange={event =>
              handleSelectFilterAuto(
                event,
                responses,
                setResponsesToShow,
                setValueSelect
              )
            }
          >
            <SelectItem key='ultimosDiez' value='ultimosDiez'>
              Últimos 10 auto registros
            </SelectItem>
            <SelectItem key='ultimaSemana' value='ultimaSemana'>
              Autoregistros de la última semana
            </SelectItem>
            <SelectItem key='ultimoMes' value='ultimoMes'>
              Autoregistros del ultimo mes
            </SelectItem>
            <SelectItem key='todos' value='todos'>
              Todos los Autoregistros
            </SelectItem>
          </Select>

          <div className='divForGraphic'>
            <UserRecords data={responsesToShow} />
          </div>

          <ScrollShadow
            className={` divForShowAutoRegistros min-[768px]:grid-cols-1 ${rotate ? 'bg-secondary-700 min-[768px]:max-w-[384px] ' : ` p-3 grid-cols-3 max-[550px]:grid-cols-2 max-[400px]:grid-cols-1`}`}
          >
            {rotate ? (
              <ScrollShadow hideScrollBar onClick={() => setRotate(false)} className='flex justify-center cursor-pointer'>
                <p className={`h-fit w-[90%] my-5`} >{responsesToShow[0]?.comments}</p>
              </ScrollShadow>
            ) : (
              responsesToCheck?.map((response, index) => {
                const fecha = new Date(response?.date);
                const dia = fecha.getDate();
                const mes = fecha.getMonth() + 1;

                return (
                  <div
                    key={index}
                    onClick={() => handleToCheckAutoRegistro(response?._id)}
                    className={rotate ? 'back' : ''}
                  >
                    <h3>{`Registro dia ${dia}/${mes}`}</h3>
                  </div>
                );
              })
            )}
          </ScrollShadow>
    </section>
  );
};

export default AutoRegistroFilters;
