import React, { useEffect, useState } from 'react';
import './style.css'; 
import InputMask from 'react-input-mask';
import { formatWeekDay } from '../../utils/formatters'

import iconClose from '../../assets/+.svg';
import { format } from 'date-fns';

function ModalRegistros({ 
  open,
  setOpen, 
  currentTransaction
}) {
  const [form, setForm] = useState({ date: '', value: 0, description: '', category: '' })
  const [activeButton, setActiveButton] = useState('credit');

  useEffect(() => {
    if(open && !currentTransaction){
      setForm(form);
      return;
    }

    if(currentTransaction) {
      setActiveButton(currentTransaction.type);

      setForm({
          date: format(new Date(currentTransaction.date), 'dd/MM/yyyy'),
          value: currentTransaction.value,
          description: currentTransaction.description, 
          category: currentTransaction.category
      })
    }
  }, [currentTransaction, open])

  function handleChange(target) {
    setForm({...form, [target.name]: target.value})
  }

  async function registerTransaction(body) {
    return await fetch('http://localhost:3333/transactions', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  
  async function editTransaction(body) {
    if (!form.value || !form.category || !form.date) {
      return;
    }

    return await fetch(`http://localhost:3333/transactions/${currentTransaction.id}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
 
  async function handleSubmit(event) {
    event.preventDefault();

    const [day, month, year] = form.date.split('/')
    const selectDate = new Date (`${month}/${day}/${year}`)

      if (!form.value || !form.category) {
        return (
          alert('Insira os campos: Valor, Categoria')
        )
      }

      const body = {
        date: selectDate,
        week_day: formatWeekDay(selectDate),
        description: form.description ? form.description : '--',
        value: Number(form.value),
        category: form.category,
        type: activeButton
      };

      if(currentTransaction){
       await editTransaction(body);
       setOpen(false)
       return;
      }

      await registerTransaction(body)
      setOpen(false)
    };

    return (
    <div className='backdrop'>
      <div className='modal__container moda__storager'>
        <img 
          src={iconClose}
          className='close__button' 
          alt='close icon'
          onClick={() => setOpen(false)} />

        <h2>{currentTransaction ? 'Editar' : 'Adicionar'} Registro</h2>

        <div className='container__buttons'>
          <button 
              className={`empty_button ${activeButton === 'credit' && 'credit__button'}`} 
              onClick={() => setActiveButton('credit')} >
              Entrada
          </button>

          <button  
            className={`empty_button
            ${activeButton === 'debit' && 'debit__button'}`}
            onClick={() => setActiveButton('debit')} >
              Saida
          </button>
        </div>

        <form onSubmit={handleSubmit} 
        className='form table'>
          <div>
            <label htmlFor='value'>Valor</label>
            <input 
             name="value" 
             value={form.value}
             type="number"
             onChange={(event) => handleChange(event.target)}  
            />
          </div>

          <div>
            <label htmlFor='category'>Categoria</label>
            <input 
             name="category" 
             value={form.category}
             onChange={(event) => handleChange(event.target)}
             className={activeButton == 'entrada' ? 'form-color-roxo' : 'form-color-laranja'} />
          </div>

          <div>
            <label htmlFor='date'>Data</label>
            <InputMask
              mask='99/99/9999'
              name ="date"
              type='text'
              value={form.date}
              onChange={(event) => handleChange(event.target)}  />
          </div>

          <div>
            <label htmlFor='description'>Descrição</label>
            <input 
              name="description"
              type='text'
              value={form.description}
              onChange={(event) => handleChange(event.target)}  />
          </div>
            
          <div className='container__submit-button'>
            <button className='submit__button'
              type='submit__button'
            >
             {currentTransaction ? 'Editar' : 'Confirmar'}
            </button>

            {false && <button onClick={() => console.log('oi')}>Cancelar</button>}
          </div>
        </form>
      </div>
  </div>
  )
}



export default ModalRegistros;