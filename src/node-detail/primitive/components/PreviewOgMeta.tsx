import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { memo } from 'react';
import { JsonLink } from '../../../api/json-link-api/json-link.types';
import { Text } from '../../../ui/components/Text';
import { isString } from '../../../utils/json.util';

type Props = {
  jsonLink: JsonLink;
};

const _PreviewOgMeta = ({ jsonLink }: Props) => {
  const { title, description, images = [] } = jsonLink;

  if (!isString(title) && !isString(description)) {
    return null;
  }

  return (
    <Card shadow="sm">
      <a className="w-full focus:outline-none" href={jsonLink.url} target="_blank" rel="noopener noreferrer">
        {images.length > 0 && (
          <CardBody className="p-0">
            <Image className="h-[120px] object-cover" src={images[0]} width="100%" alt={title} />
          </CardBody>
        )}

        <CardFooter className="flex-col items-start">
          <Text
            className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold"
            title={title as string}
          >
            {title as string}
          </Text>

          <Text
            className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-zinc-400"
            title={description as string}
          >
            {description as string}
          </Text>
        </CardFooter>
      </a>
    </Card>
  );
};

export const PreviewOgMeta = memo(_PreviewOgMeta);
