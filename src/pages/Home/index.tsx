import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-[#0d1321] text-4xl">Hi, welcome to Polls!</h1>
      <h3 className="text-[#0d1321] text-2xl">
        This is a system where you can create and vote in polls.
      </h3>

      <div className="mt-12 flex flex-col p-4">
        <p className="text-[#1d2d44] text-xl">
          Choose an option to get started.
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <Link
            to={'/new-poll'}
            className="bg-[#1d2d44] text-[#f0ebd8] p-4 rounded-2xl flex justify-center items-center"
          >
            <button>Create a poll</button>
          </Link>
          <Link
            to={'/all-polls'}
            className="bg-[#1d2d44] text-[#f0ebd8] p-4 rounded-2xl flex justify-center items-center"
          >
            <button>Vote in a poll</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
