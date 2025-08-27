import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Comment, Post } from '../interfaces';
import Image from 'next/image';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Link from 'next/link';
import { Button, CircularProgress, TextField } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));





export default function PostDetails({ post, isComments = false }: { post: Post, isComments?: boolean }) {
    const [expanded, setExpanded] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let form = e.target as HTMLFormElement
        let values = {
            content: form.comment.value,
            post: post._id,
        }

        let response = await fetch(`https://linked-posts.routemisr.com/comments`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'token': `${localStorage.getItem('token')}`,
                'Content-Type': 'Application/json',
            }
        })
        let data = await response.json();
        console.log(data);
        setComments(data.comments)
        form.comment.value = null

    }

    return (
        <Card sx={{ m: 5, }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <Image src={post.user.photo} alt={post.user.name} style={{ width: '100%', height: 'auto' }} width={60} height={60} />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.user.name}
                subheader={post.createdAt.split('T', 1)}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {post.body}
                </Typography>
            </CardContent>

            {post.image && <Image src={post.image} alt={`${post.body}`} width={400} height={300} style={{ width: '100%', objectFit: 'contain' }} />}

            <CardActions sx={{ width: '70%', mx: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                <IconButton aria-label="add to favorites">
                    <ThumbUpIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </ExpandMore>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {post.comments.length > 0 && isComments == false ? <CardContent sx={{ backgroundColor: '#eee', my: 2 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {!post.comments[0].commentCreator.photo.includes('undefined') ? <Image src={post.comments[0].commentCreator.photo} alt={post.comments[0].commentCreator.name} style={{ width: '100%', height: 'auto' }} width={60} height={60} />
                                    : post.comments[0].commentCreator.name.slice(0, 1)}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={post.comments[0].commentCreator.name}
                        subheader={post.comments[0].createdAt.split('T', 1)}
                    />
                    <Typography sx={{ marginBottom: 2, width: '80%', mx: 'auto', }}>
                        {post.comments[0].content}
                    </Typography>
                    <Link href={`/singlepost/${post._id}`} style={{ display: 'block', width: '100', textAlign: 'right', color: '#09c' }}>View All Comments</Link>
                </CardContent> :
                    post.comments.length > comments.length && isComments ? post.comments.map((comment: Comment) =>
                        <CardContent key={comment._id} sx={{ backgroundColor: '#eee', my: 2 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {!comment.commentCreator.photo.includes('undefined') ? <Image src={comment.commentCreator.photo} alt={comment.commentCreator.name} style={{ width: '100%', height: 'auto' }} width={60} height={60} />
                                            : comment.commentCreator.name.slice(0, 1)}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={comment.commentCreator.name}
                                subheader={comment.createdAt.split('T', 1)}
                            />
                            <Typography sx={{ marginBottom: 2, width: '80%', mx: 'auto', }}>
                                {comment.content}
                            </Typography>
                        </CardContent>) :
                        comments.map((comment: Comment) =>
                            <CardContent key={comment._id} sx={{ backgroundColor: '#eee', my: 2 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {!comment.commentCreator.photo.includes('undefined') ? <Image src={comment.commentCreator.photo} alt={comment.commentCreator.name} style={{ width: '100%', height: 'auto' }} width={60} height={60} />
                                                : comment.commentCreator.name.slice(0, 1)}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={comment.commentCreator.name}
                                    subheader={comment.createdAt.split('T', 1)}
                                />
                                <Typography sx={{ marginBottom: 2, width: '80%', mx: 'auto', }}>
                                    {comment.content}
                                </Typography>
                            </CardContent>)}
                <form onSubmit={(e) => handleSubmit(e)} style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <TextField label="Comment" id='comment' name="comment" type='text' variant="outlined" sx={{ flexGrow: 1 }} />
                    <Button type="submit" variant="contained" size='large' color="primary" sx={{
                        alignSelf: 'center', textTransform: "none", fontWeight: "bold", transition: "all 0.3s ease", ":hover": {
                            backgroundColor: "#1b2c48",
                            transform: "scale(1.03)",
                        },
                    }}
                    >
                        Comment
                    </Button>

                </form>
            </Collapse>
        </Card>
    );
}
