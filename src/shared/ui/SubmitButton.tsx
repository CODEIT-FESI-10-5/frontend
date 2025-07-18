interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export default function SubmitButton({ name, ...props }: SubmitButtonProps) {
  return (
    <button className="rounded-6 bg-primary text-text-white flex h-54 w-442 items-center justify-center">
      {name}
    </button>
  );
}
