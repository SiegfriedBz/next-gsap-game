import { cn } from "@/utils";
import { ReactNode } from "react";

type Props = {
  label: string;
  icon?: ReactNode;
  className?: string;
};
const Cta = ({ icon, label, className }: Props) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl shadow-xl text-sm bg-violet-50 text-blue-200 font-semibold flex items-center gap-x-2 uppercase tracking-wider",
        className
      )}
    >
      {icon && icon} {label}
    </button>
  );
};

export default Cta;
