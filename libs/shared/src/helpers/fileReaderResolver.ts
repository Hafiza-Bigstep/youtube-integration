//
import { FileReturnType, FileReturnTypeEnum, HTMLImage } from '../types/media';

export default function fileReaderResolver(
  file: File,
  type: FileReturnTypeEnum
): Promise<FileReturnType> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      switch (type) {
        case 'image': {
          const img = new Image() as HTMLImage;
          img.src = fileReader.result as string;
          img.name = file.name;
          img.size = file.size;
          img.type = file.type;
          img.onload = () => {
            resolve(img);
          };
          return;
        }
        case 'json':
        case 'text':
        case 'image-url':
        default:
          if (!fileReader.result) {
            reject(new Error('File Empty'));
            return;
          }

          resolve(fileReader.result.toString());
      }
    };

    fileReader.onabort = reject;
    fileReader.onerror = reject;

    if (['text', 'json'].includes(type)) {
      fileReader.readAsText(file);
    } else {
      fileReader.readAsDataURL(file);
    }
  });
}
