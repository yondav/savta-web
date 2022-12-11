import React from 'react';
import type { UseFormReturn, FieldErrorsImpl } from 'react-hook-form';
import tw, { styled } from 'twin.macro';

import { Cell, Span } from 'components';
import { classes } from 'styles';

import type { CellSpanValue, Gap, InputProps } from 'types';

const { form } = classes;

const Base = styled.form<{
  grid?: {
    cols: CellSpanValue;
    gap: Gap;
  };
}>(({ grid }) => form.base({ grid }));

const Group = styled(Cell)(form.group);

const Input = styled.input<InputProps & UseFormReturn['register']>(props =>
  form.input(props)
);

const Label = styled.label(form.label);

const Error = ({
  errors,
  name,
}: {
  errors: Partial<FieldErrorsImpl>;
  name: keyof typeof errors;
}) => (
  <Span
    color='danger'
    weight='semi'
    css={errors[name] ? tw`text-xs block` : tw`text-xs hidden`}
  >
    {(errors[name]?.message as string) ?? ''}
  </Span>
);

export { Base, Group, Input, Label, Error };
