export enum MediaTypeEnum {
  Image = 'Image',
  Video = 'Video',
  Audio = 'Audio',
  Document = 'Document',
}

export enum MediaImageContentTypeEnum {
  png = 'image/png',
  jpeg = 'image/jpeg',
  jpg = 'image/jpg',
  gif = 'image/gif',
}

export enum MediaAudioContentTypeEnum {
  mp3 = 'audio/mpeg',
  ogg = 'audio/ogg',
  aac = 'audio/aac',
  webm = 'audio/webm',
  wav = 'audio/wav',
  flac = 'audio/flac',
}

export enum MediaDocumentContentTypeEnum {
  json = 'application/json',
  pdf = 'application/pdf',
  doc = 'application/msword',
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ppt = 'application/vnd.ms-powerpoint',
  pptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}

export enum MediaVideoContentTypeEnum {
  mp4 = 'video/mp4',
}

export type ImageMediaOptions = {
  maxWidth?: number;
  maxHeight?: number;
};

export type DocumentMediaOptions = {
  maxSize?: number;
};

export type HTMLImage = HTMLImageElement & { type: string; size: number };

export type ThumbnailType = {
  uri: string;
  width: number;
  height: number;
  type: 'image/png' | 'image/jpeg' | 'image/gif';
  size: number;
  name: string;
};

export type FileReturnType = (File | HTMLImage | string) & { _id?: string };

export enum FileReturnTypeEnum {
  File = 'file',
  Text = 'text',
  Image = 'image',
  ImageUrl = 'image-url',
  JSON = 'json',
}
