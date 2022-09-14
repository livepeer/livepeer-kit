import * as React from 'react';

/**
 * As prop
 */
export type As<Props = any> = React.ElementType<Props>;

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export const useConditionalIcon = (
  conditional: boolean,
  truthyIcon: React.ReactNode | null | undefined,
  truthyDefaultIcon: React.ReactNode,
  falsyIcon: React.ReactNode | null | undefined,
  falsyDefaultIcon: React.ReactNode,
) => {
  const element = React.useMemo(
    () =>
      conditional
        ? truthyIcon ?? truthyDefaultIcon
        : falsyIcon ?? falsyDefaultIcon,
    [conditional, truthyIcon, truthyDefaultIcon, falsyIcon, falsyDefaultIcon],
  );

  return React.isValidElement(element) ? React.cloneElement(element) : null;
};

export const useMemoizedIcon = (
  icon: React.ReactNode | null | undefined,
  defaultIcon: React.ReactNode,
) => {
  return React.useMemo(
    () =>
      icon && React.isValidElement(icon)
        ? React.cloneElement(icon)
        : defaultIcon,
    [icon, defaultIcon],
  );
};
