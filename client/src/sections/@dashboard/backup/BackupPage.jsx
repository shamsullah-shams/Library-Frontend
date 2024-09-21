import { Helmet } from 'react-helmet-async';
import { FiDownload, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import { apiUrl, routes } from '../../../constants';
import BackupDialog from './BackupDialog';

const Backup = () => {
  const { tokens } = useAuth();
  const [backupFile, setBackupFile] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const downloadBackup = async () => {
    axios({
      url: apiUrl(routes.BACKUP),
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${tokens.access.token}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'backup.gz';
        if (contentDisposition) {
          const matches = /filename="([^"]*)"/.exec(contentDisposition);
          if (matches != null && matches[1]) {
            fileName = matches[1];
          }
        }

        if (contentDisposition) {
          const matches = /filename="([^"]*)"/.exec(contentDisposition);
          if (matches != null && matches[1]) {
            fileName = matches[1];
          }
        }

        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        toast.error(error.response.data.message || 'Something went wrong, please try again');
      });
  };

  const uploadBackup = async () => {
    const inputDoc = document.getElementById('backupFile');
    inputDoc.click();
  };

  const sendBackupFile = () => {
    const formdata = new FormData();
    formdata.append('name', 'book.name');

    formdata.append('backupFile', backupFile);

    axios
      .post(apiUrl(routes.BACKUP), formdata, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('backup file uploaded');
        setIsDialogOpen(false);
      })
      .catch((error) => {
        setIsDialogOpen(false);
        toast.error(error.response.data.message || 'Something went wrong, please try again');
      });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            Backup
          </Typography>
        </Stack>
      </Container>
      <Divider />
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button
            onClick={downloadBackup}
            component="label"
            startIcon={<FiDownload />}
            variant="contained"
            color="info"
            sx={{ width: '180px', height: '50px' }}
          >
            Download
          </Button>
          {/* <Button onClick={uploadBackup} startIcon={<FiUpload />} variant="contained" sx={{ width: '150px' }}>
            Upload
          </Button>
          <input
            name="backupFile"
            id="backupFile"
            type="file"
            hidden
            accept=".gz"
            onChange={(event) => {
              setBackupFile(event.target.files[0]);
              setIsDialogOpen(true);
            }}
          /> */}

          <Button
            sx={{ width: '180px', height: '50px' }}
            size="large"
            variant="contained"
            component="label"
            color="info"
            startIcon={<FiDownload />}
          >
            Upload
            <input
              type="file"
              accept=".gz"
              hidden
              onChange={(event) => {
                setBackupFile(event.target.files[0]);
                setIsDialogOpen(true);
              }}
            />
          </Button>
        </Stack>
      </Container>

      <BackupDialog
        isDialogOpen={isDialogOpen}
        handleDeleteBook={sendBackupFile}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default Backup;
