export interface PayloadAction {
  type: string;
  payload?: any;
}
export interface ComponentType {
  (props?: any, ...args: any[]): string;
}
