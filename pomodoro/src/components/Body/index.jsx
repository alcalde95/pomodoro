import { useState } from 'react'
import { useEffect } from 'react'
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
    const [durationActiveFase, setdurationActiveFase] = useState(0)
    const [durationRestFase, setdurationRestFase] = useState(0)
    const [endTime, setendTime] = useState(date.getHours() + ':' + date.getMinutes())
    const [hoursPomodoro, sethoursPomodoro] = useState(0)
    const [fase, setfase] = useState('Trabajo')

    const [cambioFase, setCambioFase] = useState('0')

    const [diff, setDiff] = useState(null)
    const [initial, setInitial] = useState(null)

    const tick = () => {
        setDiff(new Date(+new Date() - initial))
    };

    const start = () => {
        setInitial(+new Date())
    }

    useEffect(() => {
        if (initial && cambioFase === '0') {
            requestAnimationFrame(tick);
            console.log('useEffectInitial')
        }
    }, [initial]);

    useEffect(() => {
        if (diff) {
            console.log('useEffectDiff')
            requestAnimationFrame(tick);
        }
    }, [diff])

    const timeFormat = (date) => {
        if (!date) return "00:00:00";
        let mm = date.getUTCMinutes();
        let ss = date.getSeconds();
        let cm = Math.round(date.getMilliseconds() / 10);

        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
        cm = cm < 10 ? "0" + cm : cm;


        if (fase == 'Trabajo' && parseInt(mm) >= durationActiveFase) {
            setfase('Descanso');
            setCambioFase(true);
            start()
            return "00:00:00";
        } else {
            if (fase == 'Descanso' && parseInt(mm) >= durationRestFase) {
                setfase('Trabajo');
                start()
                return "00:00:00";
            }
        }
        return mm + ':' + ss + ':' + cm;
    };






    if (durationActiveFase < '0') setdurationActiveFase('0')
    if (durationRestFase < '0') setdurationRestFase('0')

    if (endTime < date.getHours() + ':' + date.getMinutes()) setendTime(date.getHours() + ':' + date.getMinutes())

    const testValues = () => {

        if (durationActiveFase != '' && durationRestFase != '' && endTime > (date.getHours() + ':' + date.getMinutes())) {
            setlaunch('');
            start();
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





    const endAll = () => {
    }


    return (
        launch == 'true' ?
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
                <Display value={timeFormat(diff)} />
                <Button value='STOP' action={() => endAll()} />
                <p id='horaInicio'>Hora inicio : {date.getHours() + ':' + date.getMinutes()}</p>
                <p id='fase'>Fase : {fase}</p>
                <p id='horaFin'>Hora Fin : {endTime}</p>
            </div>

    )
}

export default Body