import { useEffect, useState } from 'react'
import { api } from '../../services/axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

type PollsType = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}[]

export function AllPolls() {
  const [polls, setPolls] = useState<PollsType>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function getAllPolls() {
    try {
      setIsLoading(true)
      const response = await api.get('/polls')
      setPolls(response.data.polls)
    } catch (err) {
      console.error(err)
      toast.error('No polls found.')
    } finally {
      setIsLoading(false)
    }
  }

  // ** Effects
  useEffect(() => {
    getAllPolls()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-[#0d1321] text-2xl">
        Choose a poll you want to vote in
      </h1>

      {isLoading ? (
        'Loading...'
      ) : (
        <div className="flex flex-col w-2/6 justify-center items-center mt-6 gap-4">
          {polls?.map((poll) => (
            <Link
              key={poll.id}
              to={`/poll/${poll.id}`}
              className="bg-[#1d2d44] text-[#f0ebd8] w-full p-4 rounded-2xl flex justify-center items-center"
            >
              {poll.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
