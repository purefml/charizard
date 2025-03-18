// hooks/useReferrals.ts

// we just named the folder home but preferrably this can be put inside app/home folder
// but its better to have it separate for easier tracking and codesplitting.
import { useState, useEffect, useMemo, useCallback } from 'react';
import { fieldAliases } from '@/utils/fieldAlias';
// Consider using useDipatch if using redux.
import { useAppStore } from '@/store';

interface Referral {
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
  avatar?: string;
}

/*
 * I Consider Using RTK here but due time constraint and setup we will
 * use a simple built in api call Fetch.
 *
 * Considerations:
 * Axios for api calls (interceptors)
 * RTK for complex / customizable builder queries
 * Separate API calls with RTK in order to code split api and state/component logics more.
 * Redux + Redux Persists.
 */
const API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000/';

const useReferrals = () => {
  const [state, dispatch] = useAppStore();
  const [form, setForm] = useState<Referral>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    street: '',
    suburb: '',
    state: '',
    postal: '',
    country: '',
    avatar: '',
  });


 // NOTE SOME OF THESE STATES CAN BE DONE THRU REDUX or CONTEXT FOR EASIER REUSABILITY
 // so we wont be prop drilling too much. for the sake of time and simple demo
 // i utlized states.
  const referrals = useMemo(() => state.referrals || [], [state.referrals]);
  const selectedReferral = useMemo(() => state.selectedReferral || {}, [state.selectedReferral]);
  const isReferralModalOpen = useMemo(() => state.referralModalOpen, [state.referralModalOpen]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedAvatar, setUploadedAvatar] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState<{hasError: boolean; message: string;}>({
    hasError: false,
    message: '',
  });
  const [success, setSuccess] = useState<{isSuccess: boolean; message: string;}>({
    isSuccess: false,
    message: ''
  })

  // Track form field errors
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Referral, string>>>({});


  // Required fields except avatar
  const requiredFields: (keyof Referral)[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'address',
    'street',
    'suburb',
    'state',
    'postal',
    'country',
  ];

  /*
   * Simple validaiton handler but this can be improved with the use of react hook form
   * we can also utilize onError / error from hook form (.YUP) to create a error label or
   * customizable handler. since we lack the full requirements we opt for simplicity.
   * but note that for productions type cases, and handling should be handled properly..
   * Setting it up will take a bit of time, but once set, it will be easily reusable.
   */

  const validateForm = useCallback((): boolean => {
    const errors: Partial<Record<keyof Referral, string>> = {};
    requiredFields.forEach((field) => {
      if (!form[field]) {
        errors[field] = `${fieldAliases[field] ?? field} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  // Fetch referrals from API
  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/referrals`);
      if (!response.ok) throw new Error('Failed to fetch referrals');
      const data: Referral[] = await response.json();
      dispatch({
        type: 'SET_REFERRALS',
        payload: data,
      });
    } catch (err) {
      setError({
        hasError: true,
        message: err instanceof Error ? err.message : 'Something went wrong'
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new referral (POST request)
  const addReferral = async () => {
    // API will also return an error since most fields are required..
    if (!validateForm()) return;
    setLoading(true);
    try {
      /*
       * Much better with RTK setup, customizable builder functions and handlers.
       * Better to use formData..
       */
      const payload = {
        // Note this is just a fallback (|| "") but will produce error since these are required on BE aside from avatar.
        firstName: form.firstName || '',
        lastName: form.lastName || '',
        email: form.email || '',
        phone: form.phone || '',
        address: form.address || '',
        state: form.state || '',
        suburb: form.suburb || '',
        country: form.country || '',
        postal: form.postal || '',
        avatar: uploadedAvatar || '', // get uploaded avatar state. we separate to avoid BE uploading image whith add referral
      };
      const response = await fetch(`${API_URL}/api/referrals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const newReferral: any = await response.json();
      // error message can be improved from BE response!.
      if (!response.ok) throw new Error(newReferral.message || 'Failed to add referral');
      // use better type than any.. time constraints :P
 
      dispatch({
        type: 'ADD_REFERRAL',
        payload: newReferral.data,
      });
      setSuccess({
        isSuccess: true,
        message: 'Referral Uploaded to DB! :)'
      })
      setUploadedAvatar('')
      resetForm();
    } catch (err) {
      setError({
        hasError: true,
        message: err instanceof Error ? err.message : 'Something went wrong'
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete referral (DELETE request)
  const deleteReferral = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/referrals/${data._id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete referral');
  
      dispatch({ type: 'REMOVE_REFERRAL', payload: data._id });
      setSuccess({
        isSuccess: true,
        message: 'Referral Deleted.'
      })
    } catch (err) {
      setError({
        hasError: true,
        message: err instanceof Error ? err.message : 'Something went wrong'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with validation
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
  
      if (formErrors[name as keyof Referral]) {
        setFormErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [formErrors]
  );

  const resetForm = () => {
    setForm({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      street: '',
      suburb: '',
      state: '',
      postal: '',
      country: '',
      avatar: ''
    });
  };

  /* Logic can be moved to redux! and Global Components for snackbar!*/
  const handleSnackbarClose = () => {
    setError({
      hasError: false,
      message: ''
    })
    setSuccess({
      isSuccess: false,
      message: ''
    })
  }


  /* 
  * Add additional handling here depending on the requirements i.e:
  * Once user uploads or select he can reselect image, 
  * additional flags...
  */

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // "file" must match the multer field name see BE code..
    setIsUploading(true)
    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData, 
      });
  
      if (!response.ok) {
        throw new Error("File upload failed");
      }
      const data = await response.json();
      setUploadedAvatar(data.imageUrl)
      setIsUploading(false)
      setSuccess({
        isSuccess: true,
        message: 'Avatar Uplaoded :)'
      })
    } catch (err) {
      setIsUploading(false)
      setError({
        hasError: true,
        message: err instanceof Error ? err.message : 'Something went wrong'
      });
    }
  };

  const handleCloseModal = () => {
    dispatch({
      type: 'SET_REFERRAL_MODAL',
      payload: false,
    });
    dispatch({
      type: 'SET_SELECTED_REFERRAL',
      payload: null,
    });
  }


  useEffect(() => {
    fetchReferrals();
  }, []);

  return {
    form,
    referrals,
    loading,
    error,
    formErrors,
    uploadedAvatar,
    isUploading,
    setIsUploading,
    handleChange,
    addReferral,
    deleteReferral,
    resetForm,
    handleSnackbarClose,
    handleFileUpload,
    handleCloseModal,
    isReferralModalOpen,
    selectedReferral,
    preview,
    success
  };
};

export default useReferrals;
