export function getOnlySelectedWeekDays(weekDays) {
    const allSelectedDays = weekDays.filter((day) => day.selected);
  
    const daysName = [];
    for (const day of allSelectedDays) {
      daysName.push(day.name.toLowerCase());
    }
  
    return daysName;
  }
  
  export function getOnlySelectedCategories(categories) {
    const allSelectedCategories = categories.filter((categ) => categ.selected);
  
    const categsName = [];
    for (const categ of allSelectedCategories) {
      categsName.push(categ.name.toLowerCase());
    }
  
    return categsName;
  }

  
export function mergeNewAndOldCategs(currentTransactions, categsInFilter) {
  const previousCategs = [];
  for (const categ of categsInFilter) {
    previousCategs.push(categ.name);
  }

  const categInCurrentTransactions = [];
  for (const transact of currentTransactions) {
    categInCurrentTransactions.push(transact.category);
  }

  for (const categ of previousCategs) {
    const categStilExists = categInCurrentTransactions.includes(categ);

    if (!categStilExists) {
      const index = previousCategs.findIndex((item) => item === categ);
      previousCategs.splice(index, 1);
    }
  }

  const categsFiltersWithoutRemovedItems = [...categsInFilter];

  for (const categ of categsInFilter) {
    const categStillExists = previousCategs.includes(categ.name);

    if (!categStillExists) {
      const index = categsFiltersWithoutRemovedItems.findIndex((item) => item === categ);
      categsFiltersWithoutRemovedItems.splice(index, 1);
    }
  }

  const categsWithoutDupplicatedItems = [...categsFiltersWithoutRemovedItems];

  for (const transact of currentTransactions) {
    if (previousCategs.indexOf(transact.category) === -1) {
      previousCategs.push(transact.category);

      categsWithoutDupplicatedItems.push({
        name: transact.category,
        selected: false
      });
    }
  }

  return categsWithoutDupplicatedItems;
}