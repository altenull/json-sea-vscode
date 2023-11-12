import { Image } from '@nextui-org/image';
import { memo } from 'react';
import { ImageSrc } from '../types/media-src.type';
import { MIMETypeAndSize } from './MIMETypeAndSize';
import { MediaViewerBox } from './MediaViewerBox';

type Props = {
  imageSrc: ImageSrc;
};

const _ImageViewer = ({ imageSrc }: Props) => {
  return (
    <MediaViewerBox>
      <a className="mx-auto block w-fit" href={imageSrc} target="_blank" rel="noopener noreferrer">
        <Image
          className="mx-auto block h-[120px] w-auto cursor-pointer"
          removeWrapper
          radius="none"
          shadow="sm"
          src={imageSrc}
          alt="image preview"
        />
      </a>

      <MIMETypeAndSize mediaSrc={imageSrc} />
    </MediaViewerBox>
  );
};

export const ImageViewer = memo(_ImageViewer);
