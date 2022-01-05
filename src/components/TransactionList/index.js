import './style.css';
import TableHeader from './TableHeader/index';
import iconEdit from '../../assets/icons8-editar 2.svg';
import iconLixo from '../../assets/icons8-lixo 4.svg';
import { formatMoney,
         formatDate,
         capitalizeWord }
        from '../../utils/formatters';
import ConfirmChoose from '../ComfirmChooce';
import { useState } from 'react';


function TransactionsList ({ 
    transactionsData,
    setCurrentTransaction,
    reload,
    setReload,
    handleOrderTransaction
}) {

    const [idItemDelete, setIdItemDelete] = useState(null)
    
    async function handleDeleteItem() {
        try {
        await fetch(`http://localhost:3333/transactions/${idItemDelete}`, {
            method:'DELETE'
            });

            setIdItemDelete(null);
            setReload(!reload)
        
        } catch (error) {
        console.log(error)
        }
    }
    

    return (
        <div className='table'>
            <TableHeader 
                handleOrderTransaction={handleOrderTransaction}
                transactionsData={transactionsData} />

            <div className='table-body'>
                {
                    transactionsData.map((item) => {
                        return (
                            <div className='table-line' key={item.id}>
                                <div className='line-items'>{formatDate(item.date)}</div>
                                <div className='line-items'>{capitalizeWord(item.week_day)}</div>
                                <div className='line-items'>{item.description}</div>
                                <div className='line-items'>{item.category}</div>
                                <div 
                                    className='line-items'
                                    style={{ color: item.type === 'credit' ? '#7B61FF' : '#fa8c10' }}
                                    >
                                        {formatMoney(item.value)}
                                </div>
                                <div className='line-items'>
                                    <img 
                                        src={iconEdit} 
                                        alt='edit icon' 
                                        className='action-button'
                                        onClick={() => setCurrentTransaction(item)} 
                                    />
                                    <img 
                                        src={iconLixo} 
                                        alt='delete icon'
                                        className='action-button'
                                        onClick={() => setIdItemDelete(item.id)} 
                                    />

                                <ConfirmChoose
                                    show={item.id === idItemDelete}
                                    setClose={() => setIdItemDelete(null)}
                                    message='Apagar item?'
                                    handleConfirm={() => handleDeleteItem()} 
                                />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TransactionsList;