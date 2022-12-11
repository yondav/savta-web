import tw, { css, theme } from 'twin.macro';

import type {
  CellProps,
  CellSpan,
  CellSpanValue,
  ContainerProps,
  FlexProps,
  Gap,
} from 'types';

export const container = {
  base: tw`p-1 md:p-2.5 rounded-md transition-all duration-200 ease-linear`,

  grid: {
    container: ({
      cols = 16,
      gap = { x: 20, y: 20 },
    }: {
      cols: CellSpanValue;
      gap?: Gap;
    }) => css`
      display: grid;
      grid-template-columns: repeat(${cols}, minmax(0, 1fr));
      column-gap: ${gap.y}px;
      row-gap: ${gap.x}px;
    `,

    cell: ({ col = 1, row = 1 }: CellSpan) => css`
      ${tw`rounded-md relative`}
      ${col && `grid-column: span ${col} / span ${col};`}
  ${row && `grid-row: span ${row} / span ${row};`}
    `,
  },

  flex: (props: FlexProps) => css`
    display: ${props.inline ? 'inline-flex' : 'flex'};
    flex-direction: ${props.column ? 'column' : 'row'};
    ${props.alignContent && `align-content: ${props.alignContent};`}
    ${props.alignItems && `align-items: ${props.alignItems};`}
    ${props.alignSelf && `align-self: ${props.alignSelf};`}
    ${props.justifyContent && `justify-content: ${props.justifyContent};`}
    ${props.basis && `flex-basis: ${props.basis};`}
    ${props.grow && `flex-grow: ${props.grow};`}
    ${props.shrink && `flex-shrink: ${props.shrink};`}
    ${props.wrap && 'flex-wrap: wrap;'}
    ${props.wrap === 'reverse' && `flex-wrap: ${props.wrap};`}
    ${props.order && `order: ${props.order};`}
    ${props.center &&
    `
    justify-content: center !important;
    align-items: center !important;`}
  ${props.gap?.x && `row-gap: ${props.gap.x}px;`}
  ${props.gap?.y && `column-gap: ${props.gap.y}px;`}
  `,

  container: (props: ContainerProps) => [
    container.base,
    props.grid && container.grid.container({ ...props.grid }),
    props.flex && container.flex({ ...props.flex }),
  ],

  cell: (props: CellProps) => [
    tw`p-0`,
    container.grid.cell(props.span),
    props.xs && container.grid.cell(props.xs),
    props.sm &&
      css`
        @media (min-width: ${theme`screens.sm`}) {
          ${container.grid.cell(props.sm)}
        }
      `,
    props.md &&
      css`
        @media (min-width: ${theme`screens.md`}) {
          ${container.grid.cell(props.md)}
        }
      `,
    props.lg &&
      css`
        @media (min-width: ${theme`screens.lg`}) {
          ${container.grid.cell(props.lg)}
        }
      `,
    props.xl &&
      css`
        @media (min-width: ${theme`screens.xl`}) {
          ${container.grid.cell(props.xl)}
        }
      `,
  ],
};
