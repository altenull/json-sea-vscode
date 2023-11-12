import { memo } from 'react';
import { Text } from '../../../ui/components/Text';

type Props = {
  text: string;
};

const _TextCopyBox = ({ text }: Props) => {
  return (
    <div className="relative flex-1 p-2">
      {/* {isHostHovered && (
        <Chip
          className="absolute left-2 top-1/2 -translate-y-1/2 text-xs opacity-100"
          variant="faded"
          color="success"
          size="sm"
        >
          {isNull(copiedText) ? 'Copy?' : 'Copied!'}
        </Chip>
      )} */}

      <Text className="overflow-x-auto whitespace-nowrap break-all text-right font-medium">{text}</Text>
    </div>
  );
};

export const TextCopyBox = memo(_TextCopyBox);
