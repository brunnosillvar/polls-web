import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/axios'
import { toast } from 'react-toastify'

type PollType = {
  id: string
  options: {
    id: string
    score: number
    title: string
  }[]
  title: string
}

export function Poll() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [poll, setPoll] = useState<PollType>()

  const { id } = useParams()

  async function getPollById() {
    try {
      setIsLoading(true)
      const response = await api.get(`/polls/${id}`)
      console.log('resposne -> ', response)
      setPoll(response.data.poll)
    } catch (err) {
      console.error(err)
      toast.error('Poll not found.')
    } finally {
      setIsLoading(false)
    }
  }

  // ** Effects
  useEffect(() => {
    getPollById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <div>
          <h1>{poll?.title}</h1>

          {poll?.options.map((option) => (
            <p key={option.id}>
              {option.title} | score: {option.score}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
