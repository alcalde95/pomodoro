import { useState } from 'react'
/*import { useEffect } from 'react'*/
import Button from '../Button'
/*import Display from '../Display'
import styles from './styles.module.css'
*/
const Body = () => {

    /*
        Un useState se usa para definir una variable y una función que van logadas
        Estan hechas para que la variable sea un valor o un calculo parcial
        destinado a ser mostrado y que va a cambiar con el tiempo

        Para más información ver https://react.dev/reference/react/useState
    */
    const [launch, setlaunch] = useState('true')
    const [durationActiveFase, setdurationActiveFase] = useState('0')

    if(durationActiveFase < '0') setdurationActiveFase('0')

    const testValues = () => {
        setlaunch('')
    }



    
    return (
       launch == 'true' ? 
       <div>
         <p>Duration Active Fase</p>
        <form >
            <input type="number" value={durationActiveFase} name= 'durationActiveFase' autoComplete='off' onChange={e => setdurationActiveFase(e.target.value)}/>
        </form>
       
        <Button value='Iniciar Sesion' action={() => testValues()} />
        </div>
         
     :
       <div>

        <p>wtf men</p>
       </div>
       
    )
}

export default Body