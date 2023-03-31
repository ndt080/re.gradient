export type SourceType  = 'video/ogg' | 'video/avi' | 'video/mp4' | 'video/JPEG'| 'video/jpeg200';

export interface Source {
  src: string;
  type: SourceType;
}
