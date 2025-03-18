'use client';
import React from 'react';
import { Stack, TextField, Box, Typography, Drawer } from '@mui/material';
import { AppButton } from '@/components';
import { useIsMobileByMediaQuery } from '@/hooks';
import AppImage from '../AppImage';
import FileUploadButton from '../FileUploadButton';

interface Props {
  children: any;
}

const BottomDrawer: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <Drawer
        anchor={'bottom'}
        open={true}
        // onClose={toggleDrawer(anchor, false)}
      >
        <Typography>Hello</Typography>
      </Drawer>
    </React.Fragment>
  );
};

export default BottomDrawer;
