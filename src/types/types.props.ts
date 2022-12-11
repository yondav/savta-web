import type { ImgHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'text' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

type CellSpanValueNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;
type CellSpanValueString =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16';

type CellSpanValue = CellSpanValueNumber | CellSpanValueString;

type CellSpan = {
  col?: CellSpanValue;
  row?: CellSpanValue;
};

type CellBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type CellProps = { span: CellSpan } & { [index in CellBreakPoints]?: CellSpan };

interface ConditionalWrapProps {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}

interface ContainerProps {
  grid?: { cols: CellSpanValue; gap: Gap };
  flex?: FlexProps;
}

interface DimmerProps {
  active?: boolean;
}

interface FlexProps {
  inline?: boolean;
  alignContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | 'initial'
    | 'inherit';
  alignItems?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
    | 'initial'
    | 'inherit';
  alignSelf?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
    | 'auto'
    | 'initial'
    | 'inherit';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
  basis?:
    | 'none'
    | 'auto'
    | 'fill'
    | 'content'
    | 'fit-content'
    | 'min-content'
    | 'max-content';
  grow?: number;
  shrink?: number;
  column?: boolean;
  wrap?: boolean | 'reverse';
  order?: number;
  center?: boolean;
  gap?: Gap;
}

interface FormGroupProps {
  editState: boolean;
  dragging?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

type Gap = {
  x?: number;
  y?: number;
};

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'circle' | 'square';
}

interface InputProps {
  error?: string;
}

interface LabelProps {
  sub?: boolean;
}

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  fitted?: 'height' | 'width';
  children: ReactNode;
}

interface SpinnerProps {
  container?: {
    size: 'full' | 'screen';
    dim?: boolean;
  };
}

interface TypographyProps {
  weight?: 'heavy' | 'semi' | 'auto';
  color?: 'current' | 'secondary' | 'white' | 'black' | 'danger' | 'success' | 'link';
}

export type {
  ButtonProps,
  CellProps,
  ContainerProps,
  CellSpan,
  CellSpanValue,
  ConditionalWrapProps,
  DimmerProps,
  FlexProps,
  FormGroupProps,
  Gap,
  ImgProps,
  InputProps,
  LabelProps,
  ModalProps,
  SpinnerProps,
  TypographyProps,
};
