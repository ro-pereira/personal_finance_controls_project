import { useEffect, useState } from 'react';
import arrowUp from '../../../assets/Polygon 3.svg';
import arrowDown from '../../../assets/Polygon 4.svg';
import './style.css';
import { orderColumnAsc, orderColumnDesc } from './utils';

function TableHeader ({ 
    handleOrderTransaction, 
    transactionsData }) 
    {
    const [filter, setFilter] = useState('date');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        if(order === 'desc'){
            orderAllTransactionByDesc();
            return;
        }

        orderAllTransactionByAsc();
    }, [filter, order]);

    function orderAllTransactionByAsc () {
        const localTransaction = [...transactionsData];

        localTransaction.sort((a, b) => orderColumnAsc(a, b, filter));
        handleOrderTransaction(localTransaction);
    }

    function orderAllTransactionByDesc () {
        const localTransaction = [...transactionsData];
        localTransaction.sort((a, b) => orderColumnDesc(a, b, filter));
        
        handleOrderTransaction(localTransaction)
    }

    function handleChangeFilter (type){
        if(filter === type){
            setOrder(order === 'asc' ? 'desc' : 'asc')
            return;
        }
        setFilter(type);
    }

    return (
        <div className='tread table-head'>
            <div 
                id='date' 
                className='column-title cursor-pointer'
                onClick={() => handleChangeFilter('date')}
            >
                <span>Data</span> 
                {filter === 'date' &&
                <img 
                src={order === 'asc' ? arrowUp : arrowDown} 
                alt='Apply filter' />
                }
                
            </div>

            <div 
            className='column-title cursor-pointer' 
            id='week-day'
            onClick={() => handleChangeFilter('weekDay')}
            >
                <span>Dia da semana</span>
                {filter === 'weekDay' &&
                <img 
                src={order === 'asc' ? arrowUp : arrowDown} 
                alt='Apply filter' />
                }
            </div>
            <div className='column-title'>
                <span>Descrição</span>
            </div>
            <div className='column-title'>
                <span>Categoria</span>
            </div>
            <div 
            id='value' 
            className='column-title cursor-pointer'
            onClick={() => handleChangeFilter('value')}
            >
                <span>Valor</span>
                {filter === 'value' &&
                <img src={order === 'asc' ? arrowUp : arrowDown}  alt='Apply filter' />
                }
            </div>
        </div>
    )
}

export default TableHeader;