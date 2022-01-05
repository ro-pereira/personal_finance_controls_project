import weekDayMap from './weekDayMap';

export function orderColumnAsc(a, b, by) {
  
    if (by === 'date') {
      return new Date(a.date) - new Date(b.date);
    }
  
    if (by === 'weekDay') {
      return weekDayMap[a.week_day] - weekDayMap[b.week_day];
    }
  
    if (by === 'value') {
      return a.value - b.value;
    }
  }
  
export function orderColumnDesc(a, b, by) {
  
    if (by === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
  
    if (by === 'weekDay') {
      return weekDayMap[b.week_day] - weekDayMap[a.week_day];
    }
  
    if (by === 'value') {
      return b.value - a.value
    }
  }