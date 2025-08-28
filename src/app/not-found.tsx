import Link from "next/link";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

export default function NotFound() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f6fa"
        >
            <Card sx={{ p: 6, textAlign: "center", boxShadow: 6, borderRadius: 4 }}>
                <CardContent>
                    <Typography variant="h3" color="primary" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Not Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Could not find the requested resource.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        href="/"
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 4,
                            py: 1.5,
                            ":hover": {
                                backgroundColor: "#1b2c48",
                                transform: "scale(1.03)",
                            },
                        }}
                    >
                        Return Home
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
