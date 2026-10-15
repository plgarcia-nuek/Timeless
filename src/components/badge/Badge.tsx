import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';

/** Figma `Estado` on badge set `1783:242`. */
export const BADGE_ESTADOS = [
  'Success',
  'Error',
  'Warning',
  'Info',
  'Alternative',
] as const;

export type BadgeEstado = (typeof BADGE_ESTADOS)[number];

const DEFAULT_LABEL: Record<BadgeEstado, string> = {
  Success: 'Validado',
  Error: 'Error',
  Warning: 'Pendiente',
  Info: 'Info',
  Alternative: 'Alternativo',
};

const ESTADO_CLASS: Record<BadgeEstado, string> = {
  Success: styles.success,
  Error: styles.error,
  Warning: styles.warning,
  Info: styles.info,
  Alternative: styles.alternative,
};

export type BadgeProps = {
  /** Propiedad Figma `Estado`. */
  estado?: BadgeEstado;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export function Badge({
  estado = 'Success',
  children,
  className,
  ...rest
}: BadgeProps) {
  const classes = [styles.root, ESTADO_CLASS[estado], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} data-estado={estado} {...rest}>
      {children ?? DEFAULT_LABEL[estado]}
    </span>
  );
}
