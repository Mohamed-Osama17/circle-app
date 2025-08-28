'use client'
import React, { FormEvent } from "react";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { State } from "../_redux/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function CreatePost() {

    const { error } = useSelector((store: State) => store.authReducer);
    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement
        const formData = new FormData();
        formData.append('body', form.body.value);
        formData.append('image', form.image.files[0]);

        const response = await fetch(`https://linked-posts.routemisr.com/posts`, {
            method: 'POST',
            body: formData,
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        })
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            toast.success('Post Added Successfully.');
            router.push('/profile');
        } else {
            toast.error(`Text field it can't be Empty`);
        }
    }


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
                    animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Card sx={{ width: 500, boxShadow: 6, borderRadius: 2 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                                    ADD YOUR POST
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={3}>
                                    Feel Free to Drop Your Post
                                </Typography>

                                <TextField
                                    fullWidth
                                    label="body"
                                    name="body"
                                    type="text"
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    name="image"
                                    type="file"
                                    variant="outlined"
                                    margin="normal"
                                />

                                <Button
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
                                >
                                    ADD
                                </Button>
                            </CardContent>
                        </Card>
                    </form>
                </motion.div>
            </motion.div>
        </Box>
    );
}
