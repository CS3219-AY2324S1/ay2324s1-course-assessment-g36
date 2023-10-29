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
  isResultsLoading: boolean;
  codeResult: CodeResult;
  onClose: () => void;
}

export default function CodeResultDrawer({
  isOpen,
  isResultsLoading,
  codeResult,
  onClose
}: IOwnProps): JSX.Element {
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