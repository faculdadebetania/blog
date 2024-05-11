import { icons, LucideProps } from 'lucide-react';

export type IconProps = LucideProps & {
  name: keyof typeof icons;
};
const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon {...props} />;
};

export default Icon;
