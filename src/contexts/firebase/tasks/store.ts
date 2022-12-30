import { ref, uploadString, getDownloadURL } from 'firebase/storage';

import type { UploadResult } from 'firebase/storage';
import type { ImageType } from 'react-images-uploading';

import { storage } from '../config';
import FirebaseTask from './task';

export default class FirebaseStoreTasks extends FirebaseTask<{
  url: string | string[];
  upload?: UploadResult | UploadResult[];
}> {
  public async uploadImage(payload: {
    file: ImageType;
    collection: string;
    doc: string;
  }) {
    const { file, collection, doc } = payload;
    try {
      if (!file.dataURL) throw new Error('No upload body provided');
      if (!file.file?.name) throw new Error('No file name provided');

      const imageRef = ref(storage, `${collection}/${doc}/${file.file.name}`);

      const upload = await uploadString(imageRef, file.dataURL, 'data_url');

      const url = await getDownloadURL(imageRef);

      console.log({ url });
      return this.response({ url, upload }, null, '');
    } catch (err) {
      return this.response(null, err);
    }
  }
}
