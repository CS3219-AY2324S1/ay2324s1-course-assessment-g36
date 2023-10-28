import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import SkeletonLoader from '@/components/Loader/SkeletonLoader';
import CodeResult from '@/components/CodeRoom/CodeResult/CodeResult';

interface IOwnProps {
  isOpen: boolean;
  onClose: () => void;
  isResultsLoading: boolean;
  codeResults: string;
}

export default function CodeResultDrawer({ isOpen, onClose, isResultsLoading, codeResults }: IOwnProps): JSX.Element {
  return <>
    <Drawer
      size="sm"
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Code results</DrawerHeader>
        <DrawerBody>
          {isResultsLoading
            ? <SkeletonLoader />
            : <CodeResult codeResultString={codeResults} />
          }
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
}