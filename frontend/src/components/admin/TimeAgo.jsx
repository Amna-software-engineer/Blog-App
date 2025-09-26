import { formatDistanceToNow } from 'date-fns'

function TimeAgo ({ date }) {
  return <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span> //addSuffix will add ago,in etc
}

export default TimeAgo
