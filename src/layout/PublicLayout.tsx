import { FunctionComponent, PropsWithChildren } from 'react';
import { Stack } from '@mui/material';

// TODO: change to your app name or other word
const TITLE_PUBLIC = 'Unauthorized - _TITLE_'; // Title for pages without/before authentication

/**
 * Renders "Public Layout" composition
 * @layout PublicLayout
 */
const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  // const onMobile = useIsMobile();

  const title = TITLE_PUBLIC;
  document.title = title; // Also Update Tab Title // TODO: Do we need this? Move it to useEffect()?

  return (
    <Stack>
      {children}
    </Stack>
  );
};

export default PublicLayout;
