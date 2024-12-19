import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NewPoll } from '../pages/NewPoll'
import { AllPolls } from '../pages/AllPolls'
import { Poll } from '../pages/Poll'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-poll" element={<NewPoll />} />
      <Route path="/all-polls" element={<AllPolls />} />
      <Route path="/poll/:id" element={<Poll />} />
    </Routes>
  )
}
