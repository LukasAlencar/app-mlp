import React from 'react'
import { StyleSheet,} from 'react-native'
import { LocaleConfig } from 'react-native-calendars'
import { Agenda } from 'react-native-calendars'

LocaleConfig.locales['pt-BR']={
    monthNames:[
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: "Hoje",
}

LocaleConfig.defaultLocale = 'pt-BR';

const timeToString = (time) =>{
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}
    export default Agenda = () => {
        const [items, setItems] = useState({});


        const loaditems = (day) => {
            setTimeout(() => {
                for (let i = -15; i < 85; i++){
                    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                    const strTime = timeToString(time);
                    if (!items[strTime]){
                        items[strTime] = [];
                        const numItems = Math.floor(Math.random() * 3 + 1);
                        for (let j = 0; j < numItems; j++){
                            items[strTime].push({
                                name: 'Item for '+ strTime + ' #'+ j,
                                height: Math.max(50, Math.floor(Math.random() * 150))
                            })
                        }
                    }
                }
                const newItems = {};
                Object.keys(items).forEach(key => {newItems[key] = items[key];});
                setItems(newItems);
            }, 1000);
        }

        return (
            <Agenda 
            items={items}
            loadItemsForMonth={loaditems} // Function
            theme={{
                calendarBackground: '#10151f',
                backgroundColor:'#10151f',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e',
            }} 
            >
            </Agenda>
        )
        
    }

    const styles = StyleSheet.create({
        container:{
            backgroundColor:'white',
        },
        agenda:{
            agendaBackground: '#10151f',
            backgroundColor:'#10151f',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e',
        },
    })





