import { useEffect, useState } from 'react';
import Filters from '../../components/Filters/Filters'
import Header from '../../components/Header';
import ModalREgistros from '../../components/Modal';
import Resume from '../../components/Resume';
import TransactionsList from '../../components/TransactionList';
import '../../css/global.css';
import './style.css';

function Main () {
  const [open, setOpen] = useState(false)
  const [transactionsData, setTransactionData] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(false);
  const [reload, setReload] = useState(false);

useEffect(() => {
  handleLoardTransactions();
}, [reload])
  
useEffect(() => {
  if(!open) {
    handleLoardTransactions();

  if(!open && currentTransaction) {
    setCurrentTransaction(false);
  }
  }
},[open]);

useEffect(() => {
  if(currentTransaction){
    setOpen(true)
  }
}, [currentTransaction]);

  async function handleLoardTransactions() {
    try {
      const response = await fetch('http://localhost:3333/transactions', {
        method: 'GET'
        });
        const data = await response.json();

        setTransactionData(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleOrderTransaction(newTransaction){
    setTransactionData(newTransaction)
  }

  return (
    <div className='container'> 
      <Header />
      <main className='conteiner__main'>      
        <div> 
          <Filters
          transactionsData={transactionsData}
          handleOrderTransaction={handleOrderTransaction}
          reload={reload}
          setReload={setReload} />

          <TransactionsList
            transactionsData={transactionsData}
            currentTransaction={currentTransaction}
            setCurrentTransaction={setCurrentTransaction}
            handleLoardTransactions={handleLoardTransactions}
            setReload={setReload}
            reload={reload}
            handleOrderTransaction={handleOrderTransaction}
          />
        </div>  
        <div>
          <Resume
          transactionsData={transactionsData} />
          <button onClick={() => open === false && setOpen(true)} className='btn-add'>Adicionar Registro</button>
        </div>
      </main>

      {open &&
      <div className='delimitar-modal'>
        {<ModalREgistros className='position'  
        setOpen={setOpen}
        open={open}
        currentTransaction={currentTransaction}
        setCurrentTransaction={setCurrentTransaction}
        />}

      </div>
}
    </div>
  );
}

export default Main;
