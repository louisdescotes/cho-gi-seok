interface Props {
  korean: string;
  align?: string;
  children: React.ReactNode;
}

export default function MainText({ korean, align = "start", children }: Props) {
  return (
    <div className="flex gap-42" style={{ alignItems: align }}>
      <p className="titleSize text-[#E83829] font-bold">{korean}</p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
