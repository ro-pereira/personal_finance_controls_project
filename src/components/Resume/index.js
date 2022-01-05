import { useEffect, useState } from 'react';
import './style.css';
import { formatMoney } from '../../utils/formatters';

function Resume ({ transactionsData }) {
    const [resume, setResume] = useState({ credit: 0, debit: 0, balance: 0 });

    useEffect(() => {
        const sumCredit = transactionsData.reduce((acum, item) => {
            return item.type === 'credit' ? acum + item.value : acum + 0;
        }, 0);

        const sumDebit = transactionsData.reduce((acum, item) => {
            return item.type === 'debit' ? acum + item.value : acum + 0;
        }, 0);

        setResume({
            credit: sumCredit,
            debit: sumDebit,
            balance: sumCredit - sumDebit
        });
    }, [transactionsData]);

    return (
        <div className='container-resume'>
            <h2>Resumo</h2>

                <div className='info-resume '>
                    <span>Entradas</span>
                    <strong className='in'>
                        {formatMoney(resume.credit)}
                    </strong>
                </div>
                <div className='info-resume'>
                    <span>Saídas</span>
                    <strong className='out'>
                        {formatMoney(resume.debit)}
                    </strong>
                </div>
                <div className='border1'></div>
                <div className='info-resume'>
                   <span>Saldo</span>
                    <strong className='balance'>
                        {formatMoney(resume.balance)}
                    </strong>
                </div>

        </div>
    )
}

export default Resume;