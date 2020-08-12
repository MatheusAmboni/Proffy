import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import './styles.css'
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: ''},
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        })

        setScheduleItems(newArray)
    }

    async function createClass(e: FormEvent) {
        e.preventDefault();
        await api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost ),
            schedule: scheduleItems,
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro!')
        })
    }

    return (
        <div id="page-teacher-form" className="container">
           <PageHeader
            title="Que incrível que você quer dar aulas." 
            description="O primeiro passo é preeencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={createClass} >
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input name="name" 
                    label="Nome Completo" 
                    value={name} 
                    onChange={(e) => { setName(e.target.value) }}
                    />

                    <Input 
                    name="avatar" 
                    label="Avatar" 
                    value={avatar}     
                    onChange={(e) => { setAvatar(e.target.value) }}
                    />
                    <Input 
                    name="whatsapp" 
                    label="Whatsapp"
                    value={whatsapp}  
                    onChange={(e) => { setWhatsapp(e.target.value) }}
                    />
                    <Textarea
                    name="bio" 
                    label="Biografia"
                    value={bio}   
                    onChange={(e) => { setBio(e.target.value) }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select
                    name="subject"
                    label="Matéria"
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value) }}
                    options={[
                        { id: 'Física', label: 'Física' },
                        { id: 'Algebra', label: 'Algebra' },
                        { id: 'Química', label: 'Química' },
                        { id: 'Programação', label: 'Programação' },
                    ]} 
                    />
                    <Input 
                    name="cost"
                    value={cost}
                    onChange={(e) => { setCost(e.target.value)}}
                    label="Custo da sua hora por aula" 
                    />
                </fieldset>

                <fieldset>
                    <legend>
                        Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo Horário
                        </button>
                    </legend> 

                 {scheduleItems.map((scheduleItem, index ) => {
                     return (
                        <div key={scheduleItem.week_day} className="schedule-item">
                        <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={scheduleItem.week_day}
                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)} 
                        options={[
                            { id: '0', label: 'Domingo' },
                            { id: '1', label: 'Segunda-feira' },
                            { id: '2', label: 'Terça-feira' },
                            { id: '3', label: 'Quarta-feira' },
                            { id: '4', label: 'Quinta-feira' },
                            { id: '5', label: 'Sexta-feira' },
                            { id: '6', label: 'Sábado' },
                        ]} 
                        />
                        <Input 
                            name="from" 
                            label="Das" 
                            type="time" 
                            value={scheduleItem.from}
                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
                        />
                        <Input 
                            name="to" 
                            label="Até" 
                            type="time" 
                            value={scheduleItem.to}
                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                        />
                    </div>
                     );
                 })}
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        Salvar Cadastro
                    </button>
                </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;

//lembrar de instalar o react-select depois de terminar a aplicação 
//para deixar o select mais atraente