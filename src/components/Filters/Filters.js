import { useState, useEffect } from "react";
import './filters.css';
import iconFilter  from '../../assets/icons8-filtro-48 1.svg'
import Chip from '../Chips';
import { weekDaysChips } from './weekDaysChips.js';
import { 
    getOnlySelectedWeekDays,   getOnlySelectedCategories, 
    mergeNewAndOldCategs } from './utils';

function ContainerFilter ({ transactionsData, handleOrderTransaction, reload, setReload }) {
    const [open, setOpen] = useState(false);
    const [weekDays, setWeekDays] = useState(weekDaysChips);
    const [categories, setCategories] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [transactionsInFilter, setTransactionsInFilter] = useState([]);

    useEffect(() => {
        populateCategoresInFilters();
    }, [transactionsInFilter])

    useEffect(() => {
        loadTransactionsInfilter()
    }, [transactionsData])

    function populateCategoresInFilters(){
        const allCategories =  mergeNewAndOldCategs(transactionsInFilter, categories);
        setCategories(allCategories)
    }

    async function loadTransactionsInfilter(){
        const response = await fetch('http://localhost:3333/transactions', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json' 
            }
        });

        const data = await response.json();

        setTransactionsInFilter(data);
    }

    function handleSelectedWeekDay(weekDay) {
    const localWeekDays = [...weekDays];

    const day = localWeekDays.find((day) => day.name === weekDay);

    day.selected = !day.selected;

    setWeekDays(localWeekDays)
    }

    function handleSelectedCategory(categoryName) {
        const localCategory = [...categories];
 
        const category = localCategory.find((category) => category.name === categoryName);
    
        category.selected = !category.selected;

        setCategories(localCategory)
        }

    function handleClearFilters () {
        const localWeekDays = [...weekDays];
        for (const day of localWeekDays) {
            day.selected = false;
        }

        const localCategory = [...categories];

        for (const categ of localCategory) {
            categ.selected = false;
        }

        setWeekDays(weekDaysChips);
        setCategories(localCategory)
        setMaxValue(0);
        setMinValue(0);

        setReload(!reload)
    }

    function applyFiltersValueMaxAndMin(localTransaction) {
        const trasactionFilterByValue = [];

            for(const transact of localTransaction){
                if(minValue && Number(transact.value) < minValue) {
                    continue;
                } 

                if(maxValue && Number(transact.value) > maxValue) {
                    continue;
                } 

                if(minValue && minValue <= Number(transact.value)){
                    trasactionFilterByValue.push(transact);
                }

                if(maxValue && maxValue >= Number(transact.value)){
                    trasactionFilterByValue.push(transact);
                }
            }

            const idTransactions = [];
            const transactionsRemoveDupplicated = [];

            for(const transact of trasactionFilterByValue) {
                if(idTransactions.indexOf(transact.id) === -1){
                    idTransactions.push(transact.id);
                    transactionsRemoveDupplicated.push(transact)
                }
            }

            handleOrderTransaction(transactionsRemoveDupplicated);
    }

    function applyAllFilters(
        localTransaction, 
        selectedCategories,
        selectedDays) {
        const filteredTransactions = [];

        for(const transact of localTransaction){
             if(minValue && Number(transact.value) < minValue) {
                 continue;
             } 
 
             if(maxValue && Number(transact.value) > maxValue) {
                 continue;
             } 
 
             if(selectedDays.length > 0 && selectedCategories.length > 0){
                 if(selectedDays.includes(transact.week_day.toLowerCase()) && selectedCategories.includes(transact.category.toLowerCase())){
                     filteredTransactions.push(transact)
                 }
                 continue;
             }
 
             if(selectedDays.length > 0  && selectedDays.includes(transact.week_day.toLowerCase())){
                 filteredTransactions.push(transact);
                 continue;
             }
 
             if(selectedCategories.length > 0 && selectedCategories.includes(transact.category.toLowerCase())){
                 filteredTransactions.push(transact)
                 continue;
             }
         }
 
         const transactionsIdAux= [];
         const transactionsWhithoutDupplicateds = [];
 
         for(const transact of filteredTransactions) {
             if(transactionsIdAux.indexOf(transact.id) === -1){
                 transactionsWhithoutDupplicateds.push(transact)
             }
         }
 
         handleOrderTransaction(transactionsWhithoutDupplicateds);
    }

    function handleApplyFilters() {
       const selectedDays = getOnlySelectedWeekDays(weekDays);
       const selectedCategories = getOnlySelectedCategories(categories);

       if(!selectedCategories.length && !selectedDays.length && !maxValue && !minValue){
           setReload(!reload)
       }
       
       const localTransaction = [...transactionsInFilter];

       if(selectedDays.length === 0 && selectedCategories.length === 0) {
         applyFiltersValueMaxAndMin(localTransaction);
         return;
       }

       applyAllFilters(
           localTransaction, 
           selectedCategories,
           selectedDays
        );
    }

    return (
        <div>
            <button className='button__filter' onClick={() => setOpen(!open)}>
                <img src={iconFilter} />
                <strong>Filter</strong>
            </button>

            {
                open && 
                <div className='container__filters'>
                    <div className='items__filter'>
                        <strong>Dia da semana</strong>
                        <div className='conteiner__chips'>
                           {
                               weekDays.map((day) => {
                                   return (
                                    <Chip
                                    key={day.id}
                                    title={day.name}
                                    selected={day.selected}
                                    handleSelectChip={handleSelectedWeekDay} />
                                   )
                               })
                           }
                        </div>
                    </div>
                    <div className='separator'></div>
                    <div className='items__filter'>
                       <strong>Categoria</strong>
                       <div className='conteiner__chips'>
                           {
                               categories.map((category) => {
                                   return (
                                    <Chip
                                    key={category.name}
                                    title={category.name}
                                    selected={category.selected}
                                    handleSelectChip={handleSelectedCategory} />
                                   )
                               })
                           }
                        </div>
                    </div>
                    <div className='separator'></div>
                    <div className='items__filter'>
                        <strong>Valor</strong>

                        <div className='container__input-filter'>
                            <label>Min.</label>
                            <input 
                                type='number' 
                                value={minValue} 
                                onChange={(e) => setMinValue(e.target.valueAsNumber)} 
                            />
                        </div>
                        <div className='container__input-filter'>
                            <label>Max.</label>
                            <input 
                                type='number' 
                                value={maxValue} 
                                onChange={(e) => setMaxValue(e.target.valueAsNumber)} />
                        </div>

                    </div>
                    <div className='container__action-buttons'> 
                        <button className='button__clear'
                        onClick={() => handleClearFilters()}>Limpar filtros</button>
                        <button className='button__apply-filters'
                        onClick={() =>  handleApplyFilters()}>Aplicar filtros</button>
                    </div>
                </div>    
            }
        </div>
    );

};

export default ContainerFilter;