import Link from 'next/link'
import { linkOpen, normal } from './styleItem.module.scss';
import React from 'react'

const Item = ({to, text, svg, open}) => {


  return (
    <Link href={to} className={open ? linkOpen : normal}>
        <div>
            {svg}
        </div>
        {!open ? null : <p>{text}</p>}
    </Link>
  )
}

export default Item