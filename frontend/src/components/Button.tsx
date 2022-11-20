import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  buttonName: string;
  onDeleteUser: (id: string) => Promise<void>;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  buttonName,
  onDeleteUser,
}: ButtonProps) => {
  const handleCLick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onDeleteUser(id);
  };

  return <button onClick={handleCLick}>{buttonName}</button>;
};
