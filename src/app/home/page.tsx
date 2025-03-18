'use client';
import React from 'react';
import { Stack, Box, Snackbar, SnackbarContent, Typography } from '@mui/material';
import ReferralForm from '@/components/common/Form';
import ReferralTable from '@/components/common/Table';
import useReferrals from '@/hooks/home/useReferral';
import UserInfoModal from '@/components/common/Modal';

/**
 * Main page of the Application
 * @page Home
 */

const ReferralBuilder: React.FC = () => {
  const {
    form,
    referrals,
    loading,
    formErrors,
    error,
    handleChange,
    addReferral,
    handleSnackbarClose,
    deleteReferral,
    handleFileUpload,
    uploadedAvatar,
    isUploading,
    handleCloseModal,
    isReferralModalOpen,
    selectedReferral,
    success
    
  } = useReferrals();

  return (
    <Stack display="flex" flexDirection="column">
      <Box sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <ReferralForm
          form={form}
          handleChange={handleChange}
          handleCreateReferral={addReferral}
          formErrors={formErrors}
          handleFileUpload={handleFileUpload}
          uploadedAvatar={uploadedAvatar}
          isLoading={isUploading || loading} // can be moved to redux to avoid too much drilling
        />
        {/* Condisder adding a pagination on this one. if table length exceeds Limit set. */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <ReferralTable form={form} referrals={referrals} handleDelete={deleteReferral} loading={loading} />
        </Box>
      </Box>

      <UserInfoModal data={selectedReferral} isOpen={isReferralModalOpen} onClose={handleCloseModal} />

      {/* TODO! MAKE THESE FOLLOWING SEPARATE GLOBAL COMPONETS! */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        open={error.hasError}
        onClose={handleSnackbarClose}
        message={error.message}
        key={'bottom' + 'error'}
      >
        <SnackbarContent
          sx={{
            backgroundColor: '#8B0000', // better to add this aswell on theme provider. todo: add global...
            color: 'white', //text
          }}
          message={error.message}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        open={success.isSuccess}
        onClose={handleSnackbarClose}
        message={success.message}
        key={'bottom' + 'success'}
      >
        <SnackbarContent
          sx={{
            backgroundColor: 'green ', // better to add this aswell on theme provider. todo: add global...
            color: 'white', //text
          }}
          message={success.message}
        />
      </Snackbar>
    </Stack>
  );
};

export default ReferralBuilder;
