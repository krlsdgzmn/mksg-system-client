import { PageHeaderProps } from "@/types";

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="pb-4">
      <h1 className="pt-4 text-lg font-bold md:text-2xl">{title}</h1>
      <p className="text-sm text-foreground/50 md:text-lg">{description}</p>
    </header>
  );
}
