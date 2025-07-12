import * as SelectPrimitive from '@rn-primitives/select';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as UISelect,
} from './ui/select';

// eslint-disable-next-line import/namespace
interface SelectProps extends SelectPrimitive.RootProps {
  placeholder: string;
  data: SelectPrimitive.ItemProps[];
}

export const Select = ({ placeholder, data, ...props }: SelectProps) => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <UISelect {...props}>
      <SelectTrigger className="flex-1">
        <SelectValue
          className="text-foreground text-sm native:text-lg"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent insets={contentInsets}>
        {data.map((item) => (
          <SelectItem key={item.value} {...item} />
        ))}
      </SelectContent>
    </UISelect>
  );
};
