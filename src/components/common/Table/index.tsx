import React from 'react';
import {
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { tableStyles } from './styles';
import { useAppStore } from '@/store';

interface Referral {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Props {
  form: Referral;
  referrals: any[];
  loading: boolean;
  handleDelete: (id: number) => void;
}

const ReferralTable: React.FC<Props> = ({ form, referrals, handleDelete, loading }) => {
  const [_state, dispatch] = useAppStore();
  const hasLivePreview = !!form.firstName || !!form.lastName || !!form.email || !!form.phone;

  return (
    <TableContainer component={Paper} sx={tableStyles.tableContainerSx}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.tableHeaderSx}>Given Name</TableCell>
            <TableCell sx={tableStyles.tableHeaderSx}>Surname</TableCell>
            <TableCell sx={tableStyles.tableHeaderSx}>Email</TableCell>
            <TableCell sx={tableStyles.tableHeaderSx}>Phone</TableCell>
            <TableCell sx={tableStyles.tableHeaderSx}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Live Preview Row */}
          {hasLivePreview && (
            <TableRow>
              <TableCell sx={tableStyles.tableCellSx}>{form.firstName || '—'}</TableCell>
              <TableCell sx={tableStyles.tableCellSx}>{form.lastName || '—'}</TableCell>
              <TableCell sx={tableStyles.tableCellSx}>{form.email || '—'}</TableCell>
              <TableCell sx={tableStyles.tableCellSx}>{form.phone || '—'}</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {form.id || (
                  <>
                    <IconButton disabled>
                      <Edit />
                    </IconButton>
                    <IconButton disabled>
                      <Delete />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          )}

          {/* Saved referrals */}
          {referrals.map((ref, index) => (
            <TableRow key={ref + index.toString()}>
              <TableCell sx={tableStyles.tableCellSx}>{ref.firstName}</TableCell>
              <TableCell sx={tableStyles.tableCellSx}>{ref.lastName}</TableCell>
              <TableCell sx={tableStyles.tableCellSx}>{ref.email}</TableCell>
              <TableCell sx={tableStyles.tableCellSx}>{ref.phone}</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <IconButton
                  color="default"
                  onClick={() => {
                    dispatch({
                      type: 'SET_SELECTED_REFERRAL',
                      payload: ref,
                    });
                    dispatch({
                      type: 'SET_REFERRAL_MODAL',
                      payload: true,
                    });
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton color="default" onClick={() => handleDelete(ref)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {loading && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Box display="flex" justifyContent="center" alignItems="center" py={2}>
                  <CircularProgress size={30} />
                </Box>
              </TableCell>
            </TableRow>
          )}
          {[...Array(Math.max(0, 5 - referrals.length))].map((_, index) => (
            <TableRow key={`empty-${index}`}>
              <TableCell colSpan={5}>&nbsp;</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReferralTable;
