import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export function formatMoney(value){
    const valueAsANumber = Number(value);

    return valueAsANumber.toLocaleString('pt-br', {
      style: 'currency', currency: 'BRL'
    });
};

export function formatDate(date) {
    const generateDate = new Date(date);
    return format(generateDate, 'dd/MM/yyyy')
};

export function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
};

export function formatWeekDay(date) {
    return format(date, 'eee', {
        locale: ptBR
      });
};