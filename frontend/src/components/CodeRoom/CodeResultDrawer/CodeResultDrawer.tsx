import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import SkeletonLoader from '@/components/Loader/SkeletonLoader';
import { CodeResult } from '@/interfaces';
import CodeResultOutput from '../CodeResultOutput/CodeResultOutput';

interface IOwnProps {
  isOpen: boolean;
  onClose: () => void;
  isResultsLoading: boolean;
  codeResult: CodeResult;
}

export default function CodeResultDrawer({ isOpen, onClose, isResultsLoading, codeResult }: IOwnProps): JSX.Element {
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
            : <CodeResultOutput codeResult={codeResult} />
          }
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
}