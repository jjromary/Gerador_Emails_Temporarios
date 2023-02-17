import { ButtonContainer } from "./styles";

interface ButtonWithIconProps {
  icon?: string;
  title: string;
  width?: string;
  height?: string;
  alt: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonWithIcon({
  icon,
  title,
  height,
  width,
  alt,
  onClick,
}: ButtonWithIconProps) {
  return (
    <ButtonContainer width={width} height={height} onClick={onClick}>
      {icon && <img src={icon} alt={alt} />}
      {title}
    </ButtonContainer>
  );
}
