export const sliceCity = (address) => {
  const firstComma = address.indexOf(",");
  const slicedAddress = address.slice(firstComma + 2, address.length);
  const secondComma = slicedAddress.indexOf(",");
  const slicedCity = slicedAddress.slice(0, secondComma);
  return slicedCity;
};

export const sliceCountry = (address) => {
  const firstComma = address.indexOf(",");
  const slicedAddress = address.slice(firstComma + 2, address.length);
  const secondComma = slicedAddress.indexOf(",");
  const slicedCountry = slicedAddress.slice(
    secondComma + 2,
    slicedAddress.length
  );
  return slicedCountry;
};
