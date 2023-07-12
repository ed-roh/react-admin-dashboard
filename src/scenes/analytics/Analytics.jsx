import React from 'react'
import Apti from './Apti'
import Total from './Total'
import Pdp from './Pdp'
import Tsc from '../scorecard/Tsc'
import Asc from '../scorecard/Asc'
import Psc from '../scorecard/Psc'

const Analytics = () => {
  return (
    <div>
        <Total/>
        <Apti/>
        <Pdp/>
        <Tsc/>
        <Asc/>
        <Psc/>
        
    </div>
  )
}

export default Analytics