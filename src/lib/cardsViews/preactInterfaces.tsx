import { WithUpdate, useOnResize } from "../premix";
import { ComponentChildren } from "preact";
import { Dimensions } from "./types";
import { playUpdate } from "./playUpdate";
import { handUpdate } from "./handUpdate";
import { dragUpdater } from "./dragUpdate";

type CardUpdateProps<T extends (...args: any) => any> = Omit<
  Parameters<T>[1],
  "tableDimensions" | "appDimensions"
>;

export const Play = ({
  getTableDimensions,
  ...rest
}: CardUpdateProps<typeof playUpdate> & {
  getTableDimensions: () => Dimensions;
}) => {
  let tableDimensions = useOnResize(getTableDimensions);

  return (
    <WithUpdate fn={playUpdate} props={{ ...rest, tableDimensions }}>
      <div />
    </WithUpdate>
  );
};

const getAppDimensions = () => ({
  w: window.innerWidth > 700 ? 700 : window.innerWidth,
  h: window.innerHeight
});

export const Hand = (props: CardUpdateProps<typeof handUpdate>) => {
  let appDimensions = useOnResize(getAppDimensions);
  return (
    <WithUpdate fn={handUpdate} props={{ ...props, appDimensions }}>
      <div
        id="hand"
        style={{
          position: "absolute"
        }}
      />
    </WithUpdate>
  );
};

type DragSurfaceProps = {
  isInHand: (cardId?: string) => boolean;
  play: (cardId: string) => void;
  isValidPlay: (cardId: string) => boolean;
  children?: ComponentChildren;
};

export const DragSurface = ({
  isInHand,
  play,
  isValidPlay,
  children
}: DragSurfaceProps) => {
  return (
    <WithUpdate fn={dragUpdater} props={{ isInHand, play, isValidPlay }}>
      <div style={{ height: "100%" }}>{children}</div>
    </WithUpdate>
  );
};
