'use client';
import React from 'react';
import { Modal, Box, Typography, Stack } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import AppImage from '../AppImage';

interface Props {
  data: any; // speicify object if can...
  isOpen: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const avatarStyle = {
  width: 100, // Adjust size as needed
  height: 100,
  borderRadius: '50%',
  overflow: 'hidden', // Ensures image stays within circle
  border: '2px solid #ddd', // Optional border
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const UserInfoModal: React.FC<Props> = ({ data, isOpen, onClose }) => {
  console.log(data);
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
          <Box sx={style}>
            {data.avatar && (
              <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
                <Box sx={avatarStyle}>
                  <AppImage src={data.avatar} width={100} height={100} />
                </Box>
              </Stack>
            )}

            <Stack>
              <Typography variant="h6">Referral Details</Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {data.firstName || ''} {data.lastName || ''}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {data.email || ''}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {data.phone || ''}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {data.address || ''}, {data.suburb || ''}, {data.state || ''},{' '}
                {data.postal || ''}, {data.country || ''}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created At: {new Date(data.createdAt || '').toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Updated At: {new Date(data.updatedAt || '').toLocaleString()}
              </Typography>
            </Stack>
          </Box>
      </Modal>
    </React.Fragment>
  );
};

export default UserInfoModal;
