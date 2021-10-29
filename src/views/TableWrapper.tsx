import { ComponentChildren } from "preact";
import { css } from "goober";
import { Dimensions } from "../lib/cardsViews/types";
import { useOnResize } from "../lib/premix";

export const tableWrapper = css`
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
`;

export const TableWrapper = ({
  children,
  getTableDimensions
}: {
  children?: ComponentChildren;
  getTableDimensions: () => Dimensions;
}) => {
  let { h } = useOnResize(getTableDimensions);
  return (
    <div className={`${tableWrapper}`} style={{ height: `${h}px` }}>
      {children}
    </div>
  );
};
