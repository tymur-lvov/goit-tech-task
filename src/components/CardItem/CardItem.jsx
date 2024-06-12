const CardItem = ({ auto }) => {
  const {
    img,
    id,
    make,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    accessories,
  } = auto;

  return (
    <>
      <img src={img} alt={`${make} ${model} ${year}`} />
    </>
  );
};

export default CardItem;
