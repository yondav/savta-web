import AWS from 'aws-sdk';
import { useToast } from 'contexts/toast';
import { useState } from 'react';

import type { ImageType, ImageListType } from 'react-images-uploading';
import { toSlug } from 'utils/utils.textFormat';

const S3_BUCKET = process.env.S3_BUCKET_NAME;
const REGION = process.env.S3_REGION;

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS,
  secretAccessKey: process.env.S3_SECRET,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export default function useUpload() {
  const [progress, setProgress] = useState<number>();
  const [selectedFiles, setSelectedFiles] = useState<ImageType[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const { toast } = useToast();

  const handleFileInput = (files: ImageListType) => {
    setSelectedFiles(files);
  };

  const uploadSingleFile = (file: ImageType) => {
    if (!file.dataURL) return toast('Error: No upload body provided', 'danger');
    if (!S3_BUCKET) return toast('Error: Unable to locate upload destination', 'danger');
    if (!file.file?.name) return toast('Error: Unable to find file name', 'danger');

    const params = {
      ACL: 'public-read',
      Body: file.file,
      Bucket: S3_BUCKET as string,
      ContentType: file.file.type ?? 'image/png',
      Key: toSlug(file.file?.name) as string,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', evt => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .on('success', evt => {
        if (!evt.error) {
          if (!S3_BUCKET && !file.file?.name) return;
          setUploadedFiles(prev => [
            ...prev,
            `https://${S3_BUCKET}.s3.amazonaws.com/${toSlug(file.file?.name as string)}`,
          ]);
        }
      })
      .send(err => {
        setProgress(undefined);
        if (err) console.error(err);
      });
  };

  return { progress, selectedFiles, uploadedFiles, handleFileInput, uploadSingleFile };
}
