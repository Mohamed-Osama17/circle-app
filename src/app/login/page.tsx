'use client'
import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { State } from "../_redux/store";
import { setError, setLoading, setToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";


export default function Login() {

    const { isLoading } = useSelector((store: State) => store.authReducer);
    const [isError, setisError] = useState(null as null | boolean)
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLoginError = () => {
        setisError(true)
        setTimeout(() => setisError(false), 800);
    };


    async function handleLogin(values: { email: string, password: string }) {
        dispatch(setLoading())
        const response = await fetch(`https://linked-posts.routemisr.com/users/signin`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json',
            }
        })
        const data = await response.json();

        if (response.ok) {
            dispatch(setToken(data.token));
            router.push('/');
        } else {
            dispatch(setError(data.error));
        }
    }

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: handleLogin
    });



    return (
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
                    animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <form onSubmit={handleSubmit}>
                        <Card sx={{ width: 500, boxShadow: 6, borderRadius: 2 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                                    Welcome Back
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={3}>
                                    Please login to continue
                                </Typography>

                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    margin="normal"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    value={values.password}
                                    onChange={handleChange}
                                />

                                <Button
                                    disabled={isLoading == true}
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
                                    onClick={handleLoginError}
                                >
                                    {isLoading ? <CircularProgress size="30px" /> : 'Login'}
                                </Button>

                                <Button
                                    variant="text"
                                    color="secondary"
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        textTransform: "none",
                                        transition: "all 0.3s ease",
                                        ":hover": {
                                            color: "#d43b3f",
                                        },
                                    }}
                                >
                                    Forgot Password?
                                </Button>

                                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                                    Don’t have an account?{' '}
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
                                        <Link href={'/register'}>Sign Up</Link>
                                    </Button>
                                </Typography>
                            </CardContent>
                        </Card>
                    </form>
                </motion.div>
            </motion.div>
        </Box>
    );
}
