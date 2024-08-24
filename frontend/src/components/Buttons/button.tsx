import React, { useState } from 'react';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  text: string;
  size:
    | 'register'
    | 'connect'
    | 'ForgotPassword'
    | 'logout'
    | 'toStart'
    | 'back'
    | 'next'
    | 'request'
    | 'accept'
    | 'refuse'
    | 'edite'
    | 'visibility'
    | 'delete';
  errorForm?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  text,
  size,
  errorForm,
  disabled,
  loading,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (onClick && !disabled && !loading) {
      setClicked(true);
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    //   className={buttonClassName}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};

export default Button;


// EXEMPLE de bouton créé par Colibree. Composant à réutiliser partout.
// Le composant reste simple et c'est le fichier de style (non montré ici) qui est adapté en fonction
// notamment de la size du bouton créé.