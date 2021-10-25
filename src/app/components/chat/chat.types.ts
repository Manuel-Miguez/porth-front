export interface MessageDto {
  sender: string;
  message: string;
}

export interface Message extends MessageDto {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
