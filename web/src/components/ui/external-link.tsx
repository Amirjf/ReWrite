import { NextLink } from './next-link';
import type { ComponentProps } from 'react';

type ExternalLinkProps = ComponentProps<typeof NextLink>;

export const ExternalLink = ({
  children,
  rel = 'noopener noreferrer',
  ...props
}: ExternalLinkProps) => {
  return (
    <NextLink target='_blank' rel={rel} {...props}>
      {children}
    </NextLink>
  );
};
