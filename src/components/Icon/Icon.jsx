import icons from "./icons.svg";

const Icon = ({ className, id, width, height }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`${icons}#${id}`}></use>
    </svg>
  );
};

export default Icon;
