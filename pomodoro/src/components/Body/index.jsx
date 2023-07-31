import { useState } from 'react'
import { useEffect } from 'react'
import Button from '../Button'
import Display from '../Display'
import styles from './styles.module.css'

const PHASE = {
    trabajo: 'Trabajo',
    descanso: 'Descanso'
}

const Body = () => {

    const date = new Date();
    const [horaInicio,setHoraInicio] = useState(date.getHours() + ':' + date.getMinutes())
    const [launch, setlaunch] = useState(true)
    const [durationActiveFase, setdurationActiveFase] = useState(0)
    const [durationRestFase, setdurationRestFase] = useState(0)
    const [endTime, setendTime] = useState((date.getHours()< 10 ? '0' + date.getHours() : date.getHours()) +':'+ (date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes()))
    const [hoursPomodoro, sethoursPomodoro] = useState(0)
    const [fase, setfase] = useState(PHASE.trabajo)

    const [fin, setFin] = useState('no')

    const [seconds, setSeconds] = useState(0);




    useEffect(() => {

        const finishJurney = () =>{
            let d = new Date();
            if(d.getHours() ==(parseInt(endTime.charAt(0) + endTime.charAt(1))) && d.getMinutes()>=parseInt(endTime.charAt(3) + endTime.charAt(4))){
                setFin('yes')
            }
        }

        const interval = setInterval(() => {
            
            if (launch == false && fin === 'no') {

                finishJurney();

                setSeconds(seconds => seconds + 1);
                console.log({ seconds })
                if (fase === PHASE.trabajo && seconds >= (durationActiveFase * 60)) {
                    setfase(PHASE.descanso);
                    setSeconds(0);
                    console.log('entrando en cambiar fase')
                }
                if (fase === PHASE.descanso && seconds >= durationRestFase * 60) {
                    setfase(PHASE.trabajo);
                    setSeconds(0);
                }
            }

        }, 1000);
        return () => clearInterval(interval);
    });




    if (durationActiveFase < '0') setdurationActiveFase('0')
    if (durationRestFase < '0') setdurationRestFase('0')

    if (endTime < date.getHours() + ':' + date.getMinutes()) setendTime(date.getHours() + ':' + date.getMinutes())

    const testValues = () => {

        if (durationActiveFase != '' && durationRestFase != '' && endTime > (date.getHours() + ':' + date.getMinutes())) {
            setlaunch(false);
        } else alert("Invalid data");

    }

    const manageEndTime = (time) => {
        setendTime(time)
        let solucion = ((parseInt(time.charAt(0) + time.charAt(1)) * 3600 + parseInt(time.charAt(3) + time.charAt(4)) * 60) - (date.getHours() * 3600 + date.getMinutes() * 60)) / 3600
        solucion = solucion.toFixed(2)
        if (solucion > 0) {
            sethoursPomodoro(solucion)
        } else sethoursPomodoro(0)

    }

    const getTime = (seconds) => {
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10) ? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10) ? '0' + minute : minute;
        var second = seconds % 60;
        second = (second < 10) ? '0' + second : second;
        return hour + ':' + minute + ':' + second;

    }

    const endAll = () => {
        setFin('')
    }

    return (
        launch == true ?
            <div className={styles.login}>
                <p>Duration Active Fase(in minutes)</p>
                <form >
                    <input type="number" value={durationActiveFase} name='durationActiveFase' autoComplete='off' onChange={e => setdurationActiveFase(e.target.value)} />
                </form>
                <p>Duration Rest Fase(in minutes)</p>
                <form >
                    <input type="number" value={durationRestFase} name='durationActiveFase' autoComplete='off' onChange={e => setdurationRestFase(e.target.value)} />
                </form>
                <p>End time</p>
                <form >
                    <input type="time" value={endTime} name='endTime' autoComplete='off' onChange={e => manageEndTime(e.target.value)} />
                </form>
                <p>Horas de duración de la sesión : {hoursPomodoro}</p>
                <Button value='Iniciar Sesion' action={() => testValues()} />
            </div>

            :

            <div>
                <Display value={getTime(seconds)} />
                <Button value='STOP' action={() => endAll()} />
                <p id='horaInicio'>Hora inicio : {horaInicio}</p>
                <p id='fase'>Fase : {fase}</p>
                <p id='horaFin'>Hora Fin : {endTime}</p>
            </div>

    )
}

export default Body