'use client'

import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const [error, setError] = useState(null as null | boolean);
  const [loading, setLoading] = useState(false as boolean);
  const router = useRouter();

  const handleRegisterError = () => {
    setError(true);
    setTimeout(() => setError(false), 800);
  };

  interface RegisterForm {
    name: string,
    email: string,
    password: string,
    rePassword: string,
    dateOfBirth: string,
    gender: string,
  }

  async function handleRegister(values: RegisterForm) {
    setLoading(true);
    const response = await fetch(`https://linked-posts.routemisr.com/users/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'Application/json',
      }
    })
    const data = await response.json();
    if (response.ok) {
      setLoading(false);
      router.push('/login');
      toast.success('Registration Successfully');
    } else {
      setLoading(false);
      setError(data.error);
      toast.error(data.error);
    }
  }



  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: '',

    },
    onSubmit: handleRegister
  })

  return <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <form onSubmit={handleSubmit}>
            <Card sx={{ width: 500, boxShadow: 6, borderRadius: 2 }}>
              <CardContent sx={{ p: 4, }}>
                <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                  Create Your Account
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Join our community and unlock exclusive features
                </Typography>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="rePassword"
                    name="rePassword"
                    type="password"
                    value={values.rePassword}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="text"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    type="text"
                    value={values.gender}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Box>

                <Button
                  disabled={loading == true}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#1b2c48",
                      transform: "scale(1.03)",
                    },
                  }}
                  onClick={handleRegisterError}
                >
                  {loading ? <CircularProgress size="30px" /> : 'Register'}
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Already have an account?
                  <Button
                    color="secondary"
                    sx={{
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      ":hover": {
                        color: "#d43b3f",
                      },
                    }}
                  >
                    <Link href={'/login'}>Sign in</Link>
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </form>
        </motion.div>
      </motion.div>
    </Box>

  </>

}
