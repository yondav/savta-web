import type { ConditionalWrapProps } from 'types';

export default function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: ConditionalWrapProps) {
  return condition ? wrapper(children) : children;
}

export type { ConditionalWrapProps };
