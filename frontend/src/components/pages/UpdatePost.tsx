import { TextField, Button, Stack, Container, MenuItem } from '@mui/material'
import { useParams } from 'react-router'
import postsService from '@/services/posts'
import { useNavigate } from 'react-router'
import useField from '@/hooks/useField'
import { useEffect, useState } from 'react'
import Title from '@/components/ui/Title'
import type { Location } from '@/types/hazards'
import { HazardType } from '@/types/hazards'
import type { Post } from '@/types/posts'
import HazardMap from '../features/HazardMap'

export default function UpdatePost() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    async function fetchPost() {
      if (!id) return
      const post = await postsService.getPostById(id)
      setPost(post)
    }
    fetchPost()
  }, [id])

  if (!post) return null

  return <UpdatePostForm post={post} id={id!} />
}

function UpdatePostForm({ post, id }: { post: Post; id: string }) {
  const navigate = useNavigate()

  const title = useField(post.title)
  const description = useField(post.description)
  const hazardType = useField<HazardType>(post.hazardType)
  const [location, setLocation] = useState<Location | null>(post.location)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!location) return
    await postsService.updatePost(
      {
        title: title.value,
        description: description.value,
        hazardType: hazardType.value,
        location,
      },
      id,
    )
    navigate('/')
  }

  return (
    <Container
      maxWidth='sm'
      sx={{ mt: 4, backgroundColor: 'background.paper', paddingBlock: 4 }}
    >
      <Stack component='form' onSubmit={handleSubmit} spacing={2}>
        <Title>Update report</Title>
        <TextField label='Title' size='small' {...title} required />
        <TextField
          label='Description'
          size='small'
          {...description}
          required
          multiline
          rows={3}
        />
        <TextField
          size='small'
          select
          label='Category'
          {...hazardType}
          fullWidth
        >
          {Object.values(HazardType).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <HazardMap location={location} setLocation={setLocation} />
        <Button
          disabled={!location || !title.value || !description.value}
          type='submit'
          variant='contained'
          fullWidth
        >
          Update report
        </Button>
      </Stack>
    </Container>
  )
}
