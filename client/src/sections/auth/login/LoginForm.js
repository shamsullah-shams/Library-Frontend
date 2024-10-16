import { useState } from 'react';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const LoginForm = ({ loginUser, isDisabled }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Stack spacing={3} sx={{ mb: 2 }}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <TextField
          name="password"
          required
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Typography variant="body2" sx={{mb: 5, mt: 3}} textAlign="center" */}
      {/* > */}
      {/*  Don’t have an account? {''} */}
      {/*  <Link variant="subtitle2">Get started</Link> */}
      {/* </Typography> */}

      <LoadingButton
        sx={{ mt: 4 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isDisabled}
        onClick={() => loginUser(email, password)}
      >
        Login
      </LoadingButton>
      <LoadingButton
        sx={{ mt: 4 }}
        fullWidth
        size="large"
        type="submit"
        variant="outlined"
        onClick={() => navigate('/student/books')}
      >
        Browse Book
      </LoadingButton>
    </>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func,
};

export default LoginForm;
