import classNames from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
  variant?: 'primary' | 'error' | 'plain';
};

function Button({
  children,
  type,
  onClick,
  disabled,
  ariaLabel,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        variant === 'error' && styles.error,
        variant === 'plain' && styles.plain
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
