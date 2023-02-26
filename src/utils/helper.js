export function filterData(searchText, allRestaurants) {
  const filteredData = allRestaurants.filter((restaurant) =>
    restaurant.data.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // console.log(filteredData);
  return filteredData;
}
