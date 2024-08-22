import { Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-500";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};
const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...otherProps
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 p-2 ${getBgVariantStyle(bgVariant)} ${className}`}
    {...otherProps}
  >
    {IconRight && <IconRight />}
    <Text
      className={`text-lg font-JakartaSemiBold ${getTextVariantStyle(textVariant)} ${className} `}
    >
      {title}
    </Text>
    {IconLeft && <IconLeft />}
  </TouchableOpacity>
);
export default CustomButton;
