import { useParams, useNavigate } from 'react-router'
import postsService from '@/services/posts'
import { useEffect, useState } from 'react'
import type { Location } from '@/types/hazards'
import { HazardType } from '@/types/hazards'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/auth'
import { appRoutes } from '@/constants/routes'
import PageLayout from '../layouts/PageLayout'
import useField from '@/hooks/useField'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import type { CreatePost } from '@/types/posts'
import Loading from '../ui/Loading'
import EditPostForm from '@/components/features/edit-post/EditPostForm'

export default function EditPost() {
  const { showNotification, createNotification } = useNotification()
  const { id: postId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { setValue: titleSetValue, ...title } = useField('')
  const { setValue: descriptionSetValue, ...description } = useField('')
  const { setValue: hazardTypeSetValue, ...hazardType } =
    useField<HazardType>('earthquake')
  const [location, setLocation] = useState<Location | null>(null)

  const { data: post = null, isLoading } = useQuery({
    queryKey: ['post', postId],
    enabled: !!postId,
    queryFn: async () => {
      try {
        return await postsService.getPostById(postId!)
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        showNotification(
          createNotification(`Cannot fetch the post: ${errorMessage}`, 'error'),
        )
        throw error
      }
    },
  })

  useEffect(() => {
    if (!post) return
    titleSetValue(post.title)
    descriptionSetValue(post.description)
    hazardTypeSetValue(post.hazardType)
    setLocation(post.location)
  }, [post, descriptionSetValue, titleSetValue, hazardTypeSetValue])

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, postId }: { data: CreatePost; postId: string }) =>
      postsService.updatePost(data, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      showNotification(
        createNotification('Post updated successfully.', 'success'),
      )
      navigate('/')
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error)
      showNotification(
        createNotification(`Cannot update post: ${errorMessage}`, 'error'),
      )
    },
  })

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!location || !postId) return
    mutate({
      data: {
        title: title.value,
        description: description.value,
        hazardType: hazardType.value,
        location: location,
      },
      postId: postId,
    })
  }

  return (
    <PageLayout pageTitle={appRoutes.editPost.pageTitle}>
      {isLoading ? (
        <Loading text='Loading post' />
      ) : (
        <EditPostForm
          onSubmit={handleSubmit}
          location={location}
          setLocation={setLocation}
          isPending={isPending}
          title={title}
          description={description}
          hazardType={hazardType}
          isLoading={isLoading}
        />
      )}
    </PageLayout>
  )
}
