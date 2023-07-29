import { useState } from 'react'
/*import { useEffect } from 'react'*/
import Button from '../Button'
import Display from '../Display'
import styles from './styles.module.css'

const Body = () => {

    /*
        Un useState se usa para definir una variable y una función que van logadas
        Estan hechas para que la variable sea un valor o un calculo parcial
        destinado a ser mostrado y que va a cambiar con el tiempo

        Para más información ver https://react.dev/reference/react/useState
    */
        const date = new Date();
    const [launch, setlaunch] = useState('true')
    const [durationActiveFase, setdurationActiveFase] = useState('0')
    const [durationRestFase, setdurationRestFase] = useState('0')
    const [endTime, setendTime] = useState(date.getHours() + ':' + date.getMinutes())
    const [hoursPomodoro, sethoursPomodoro] = useState(0)
    
    if(durationActiveFase < '0') setdurationActiveFase('0')

    if(endTime < date.getHours()+ ':' + date.getMinutes()) setendTime(date.getHours() + ':' + date.getMinutes())
    
    const testValues = () => {
        setlaunch('')
    }

    const manageEndTime = (time) => {
            setendTime(time)
            let solucion = ((parseInt(time.charAt(0)+time.charAt(1))*3600 + parseInt(time.charAt(3)+time.charAt(4))*60)-(date.getHours()*3600+date.getMinutes()*60))/3600
            solucion = solucion.toFixed(2)
            sethoursPomodoro(solucion)
    }

    
    const endAll = () => {
    }

    
    return (
       launch == 'true' ? 
       <div className={styles.login}>
         <p>Duration Active Fase(in minutes)</p>
        <form >
            <input type="number" value={durationActiveFase} name= 'durationActiveFase' autoComplete='off' onChange={e => setdurationActiveFase(e.target.value)}/>
        </form>
        <p>Duration Rest Fase(in minutes)</p>
        <form >
            <input type="number" value={durationRestFase} name= 'durationActiveFase' autoComplete='off' onChange={e => setdurationRestFase(e.target.value)}/>
        </form>
        <p>End time</p>
        <form >
            <input type="time" value={endTime} name= 'endTime' autoComplete='off' onChange={e => manageEndTime(e.target.value)}/>
        </form>
        <p>Horas de duración de la sesión : {hoursPomodoro}</p>
        <Button value='Iniciar Sesion' action={() => testValues()} />
        </div>
         
     :
     
       <div>
    <Display value={durationActiveFase} />
        <Button value = 'STOP' action={() => endAll()} />
        <p>todo el cuerpo con el displays</p>
       </div>
       
    )
}

export default Body