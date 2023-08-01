export function filterData(searchText, allRestaurants) {
  const filteredData = allRestaurants.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // console.log(filteredData);
  return filteredData;
}

export function getNumberFromString(cost) {
  // get integer from string cost of two

  //       To get integer value from string, use this code const str = '₹200 for two';
  //       const int = str.match(/\d+/g)
  //       console.log(+int) // 200

  let int = cost.match(/\d+/g);

  return +int;
}


export function paginate (arr, size) {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size)
    let page = acc[idx] || (acc[idx] = [])
    page.push(val)

    return acc
  }, []);
}