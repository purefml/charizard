'use client';
import React from 'react';
import { Stack, TextField, Box, Typography, LinearProgress } from '@mui/material';
import { AppButton } from '@/components';
import { useIsMobileByMediaQuery } from '@/hooks';
import AppImage from '../AppImage';
import FileUploadButton from '../FileUploadButton';
import { avatarStyle } from './styles';

interface ReferralFormProps {
  form: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    street: string;
    suburb: string;
    state: string;
    postal: string;
    country: string;
  };
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateReferral: () => void;
  handleFileUpload: (file: File) => void; // Ensure it accepts a File
  formErrors: any;
  uploadedAvatar?: string;
}

// Common styling for input fields
const inputFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': { borderColor: '#57c76e' },
  },
};

// FOR BETTER CUSTOMIZATION AND REACT HOOKS FORM SUPPORT CONSIDER
// MOVING THIS TO A SEPERATE FILE / COMPONENT.
// Reusable InputField Component
// Todo: add additional validation on change, on client side if possible i.e: Email
// but can easily be done with use react hook.

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  error: boolean;
  helperText: string;
  maxLength?: number;
  mode?: 'text' | 'search' | 'none' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, error, helperText, name, value, maxLength = 100, onChange, mode = 'text' }) => (
  <Stack flex={1}>
    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{label}</Typography>
    {/*
     * Consider adding custom types i.e input type = numeric, email and other customizable props
     * and event handlers and input handlers.
     */}

    <TextField
      fullWidth
      sx={inputFieldStyle}
      name={name}
      inputMode={mode}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      onInput={(e: any) => {
        if (e.target.value.length > maxLength) {
          e.target.value = e.target.value.slice(0, maxLength); // Restrict input manually
        }
      }}
    />
  </Stack>
);

// Optimized FieldContainer
const FieldContainer = React.memo(({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobileByMediaQuery();
  return (
    <Box display={isMobile ? 'grid' : 'flex'} gap={3}>
      {children}
    </Box>
  );
});

// We can split the code logics for inputfields more if hooks form is used,
// but this way we opt on using the package. this shows that it is still possible.
const ReferralForm: React.FC<ReferralFormProps> = ({
  form,
  handleChange,
  handleCreateReferral,
  formErrors,
  handleFileUpload,
  uploadedAvatar,
  isLoading,
}) => {
  return (
    <Box flex={1} sx={{ backgroundColor: 'white', p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', my: 2 }}>
        Referral Builder
      </Typography>

      <Stack sx={{ mb: 2, pb: 1, borderBottom: 0.5, borderBottomColor: '#d4d4d4' }}>
        {' '}
        {/* move this color hex to themes */}
        <Typography>PERSONAL DETAILS</Typography>
      </Stack>

      <Box display="flex" flexDirection="column" gap={5}>
        <FieldContainer>
          <InputField
            label="GIVEN NAME"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            maxLength={25}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
          />
          <InputField
            label="SURNAME"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            maxLength={25}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />
        </FieldContainer>

        <FieldContainer>
          <InputField
            label="EMAIL"
            name="email"
            mode="email"
            value={form.email}
            maxLength={50}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <InputField
            label="PHONE"
            name="phone"
            mode="numeric"
            value={form.phone}
            onChange={handleChange}
            maxLength={11}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
          />
        </FieldContainer>

        <Stack sx={{ mb: 2, pb: 1, borderBottom: 0.5, borderBottomColor: '#d4d4d4' }}>
          {' '}
          {/* move this color hex to themes */}
          <Typography>ADDRESS</Typography>
        </Stack>

        <FieldContainer>
          <InputField
            label="HOME NAME OR #"
            name="address"
            value={form.address}
            onChange={handleChange}
            maxLength={25}
            error={!!formErrors.address}
            helperText={formErrors.address}
          />
          <InputField
            label="STREET"
            name="street"
            value={form.street}
            maxLength={20}
            onChange={handleChange}
            error={!!formErrors.street}
            helperText={formErrors.street}
          />
        </FieldContainer>

        <FieldContainer>
          <InputField
            label="SUBURB"
            name="suburb"
            value={form.suburb}
            maxLength={15}
            onChange={handleChange}
            error={!!formErrors.suburb}
            helperText={formErrors.suburb}
          />
          <InputField
            label="STATE"
            name="state"
            value={form.state}
            onChange={handleChange}
            maxLength={15}
            error={!!formErrors.state}
            helperText={formErrors.state}
          />
        </FieldContainer>

        <FieldContainer>
          <InputField
            label="POSTCODE"
            name="postal"
            mode="numeric"
            maxLength={5}
            value={form.postal}
            onChange={handleChange}
            error={!!formErrors.postal}
            helperText={formErrors.postal}
          />

          {/* Use a custom country selection */}
          <InputField
            label="COUNTRY"
            name="country"
            value={form.country}
            onChange={handleChange}
            maxLength={20}
            error={!!formErrors.country}
            helperText={formErrors.country}
          />
        </FieldContainer>

        {uploadedAvatar && (
          <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
            <Box sx={avatarStyle}>
              <AppImage src={uploadedAvatar} width={100} height={100} />
            </Box>
          </Stack>
        )}

        <FieldContainer>
          <FileUploadButton
            onFileSelect={handleFileUpload}
            maxSizeMB={2}
            accept="image/png, image/jpeg"
            // this is a bit hackish, can be done thru redux so we wont be prop drilling and having
            // additional Boolean conversion. store boolean directly thru redux from api response.
            isDisabled={isLoading}
          />
          <AppButton
            onClick={handleCreateReferral}
            disabled={isLoading}
            fullWidth
            sx={{ p: 2, backgroundColor: '#64db7c', color: 'white', '&:hover': { backgroundColor: '#57c76e' } }}
          >
            Create Referral
          </AppButton>
        </FieldContainer>
      </Box>
      {isLoading && <LinearProgress />}
    </Box>
  );
};

export default ReferralForm;
