import { styled } from 'twin.macro';

import { classes } from 'styles';

import type { CellProps, ContainerProps } from 'types';

const { container } = classes;

const Container = styled.div<ContainerProps>(props => container.container(props));

const Cell = styled(Container)<CellProps>(
  ({
    span = { col: 16 },
    xs,
    sm,
    md,
    lg,
    xl,
    grid,
    flex = {
      column: true,
      justifyContent: 'flex-start',
      gap: { x: 8, y: 8 },
    },
  }) => [
    container.cell({ span, xs, sm, md, lg, xl }),
    container.container({ grid, flex }),
  ]
);

export default Container;

export { Cell };
