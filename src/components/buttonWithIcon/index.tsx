import { ButtonContainer } from "./styles";

interface ButtonWithIconProps {
  icon?: string;
  title: string;
  width?: string;
  height?: string;
  alt: string;
}

export default function ButtonWithIcon({
  icon,
  title,
  height,
  width,
  alt,
}: ButtonWithIconProps) {
  return (
    <ButtonContainer width={width} height={height}>
      {icon && <img src={icon} alt={alt} />}
      {title}
    </ButtonContainer>
  );
}
