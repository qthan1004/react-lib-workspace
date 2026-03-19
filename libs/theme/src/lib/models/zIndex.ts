export interface ZIndex {
  drawer: number;
  modal: number;
  popover: number;
  tooltip: number;
  alert: number;
  dialogs: number;
  [key: string]: number;
}

export type ZIndexOptions = Partial<ZIndex>;

declare const zIndex: ZIndex;

export default zIndex;
