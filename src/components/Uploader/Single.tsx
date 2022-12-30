import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef, useState, useEffect, useMemo, useCallback } from 'react';
import { SlCloudUpload, SlTrash } from 'react-icons/sl';
// import { TfiSaveAlt } from 'react-icons/tfi';
import ImageUploading from 'react-images-uploading';
import { styled } from 'twin.macro';

import useUpload from 'hooks/useUpload';
import { classes } from 'styles';

import type { InputHTMLAttributes, RefObject, ImgHTMLAttributes } from 'react';
import type { ImageListType } from 'react-images-uploading';

import Button from '../Button';
import Container from '../Container';
import Image from '../Img';
import { Span } from '../Typography';
import Spinner from '../Spinner';

type Ref = HTMLInputElement;
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  assignment(img: string): void;
  currImg?: Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
  path: { coll: string; doc: string };
}

const { uploader } = classes;

const StyledInput = styled.input(uploader.single.input());
const StyledContainer = styled(Container)(uploader.single.container());
const StyledContent = styled(motion.div).attrs(uploader.single.content.animation)(
  uploader.single.content.style()
);

const Single = forwardRef<Ref, Props>(({ currImg, path, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [defaultHeight, setDefaultHeight] = useState<number>();

  const maxNumber = 1;

  const { loading, selectedFiles, uploadedFiles, handleFileInput, uploadSingleFile } =
    useUpload();

  const inputRef = useMemo(
    () => (ref ? (ref as RefObject<HTMLInputElement>) : undefined),
    [ref]
  );

  const onChange = useCallback(
    (imageList: ImageListType) => {
      handleFileInput(imageList);
    },
    [handleFileInput]
  );

  useEffect(() => {
    let ignore = false;

    if (inputRef?.current) {
      const getHeight = () => {
        if (!ignore) setDefaultHeight(inputRef.current?.getBoundingClientRect().width);
      };

      getHeight();
    }

    return () => {
      ignore = true;
    };
  }, [inputRef]);

  useEffect(() => {
    let ignore = false;

    if (uploadedFiles.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      if (!ignore) props.assignment(uploadedFiles[0]);
    }

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

  return (
    <>
      <ImageUploading
        multiple={false}
        value={selectedFiles}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <StyledContainer
            css={{
              height: imageList.length === 0 ? `${defaultHeight}px` : 'auto',
              filter: `saturate(${isDragging ? '50%' : '100%'})`,
            }}
            flex={{ justifyContent: 'center', alignItems: 'center' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onImageUpload}
            {...dragProps}
          >
            {!currImg && imageList.length === 0 ? (
              <SlCloudUpload
                size={defaultHeight ? defaultHeight / 2.5 : 40}
                tw='p-3 text-purple-400 cursor-pointer'
              />
            ) : (
              <Image
                {...currImg}
                src={imageList.length !== 0 ? imageList[0].dataURL : currImg?.src}
                tw='cursor-pointer'
              />
            )}
            <StyledInput ref={ref} {...props} type='text' />
            <AnimatePresence>
              {isHovered && (
                <StyledContent>
                  {imageList.length > 0 ? (
                    <Container
                      flex={{ justifyContent: 'center', gap: { y: 12 } }}
                      tw='text-neutral-100'
                    >
                      <SlCloudUpload
                        size='1.125em'
                        tw='hover:text-purple-200 transition-colors'
                        onClick={() => onImageUpdate(0)}
                      />
                      <SlTrash
                        size='1.125em'
                        tw='hover:text-purple-200 transition-colors'
                        onClick={() => onImageRemove(0)}
                      />
                    </Container>
                  ) : (
                    <Span weight='semi' color='white' tw='text-xs'>
                      Click or Drop here
                    </Span>
                  )}
                </StyledContent>
              )}
            </AnimatePresence>
          </StyledContainer>
        )}
      </ImageUploading>
      <Button
        disabled={selectedFiles.length === 0 || uploadedFiles.length !== 0}
        variant='success'
        type='button'
        onClick={() => {
          uploadSingleFile({
            file: selectedFiles[0],
            collection: path.coll,
            doc: path.doc,
          });
        }}
        tw='w-full mt-1.5'
      >
        <Container
          flex={{ justifyContent: 'center', alignItems: 'center', gap: { y: 10 } }}
          tw='py-0'
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <SlCloudUpload /> Upload
            </>
          )}
        </Container>
      </Button>
    </>
  );
});

export default Single;
