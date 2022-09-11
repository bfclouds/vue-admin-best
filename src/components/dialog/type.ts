export enum MessageType {
  delete = 'delete',
  edit = 'edit',
  add = 'add',
}

export interface Message {
  type?: MessageType
  title?: string
  txt?: string
}

export interface HandlerObj {
  handler: Set<(d: any) => void>
  cancelHandler: Set<(d: any) => void>
  on: (fn: (d: any) => void) => void
  onCancel: (fn: (d: any) => void) => void
}

export interface GDialogType {
  show: (data: any, message: Message) => {}
}
