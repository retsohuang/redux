import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUnresolvedBugs, loadBugs, resolveBug } from '@/store/bugs'

const Bugs = () => {
  const bugs = useSelector(getUnresolvedBugs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBugs())
  }, [dispatch])

  return (
    <ul>
      {bugs.map((bug) => (
        <>
          <li key={bug.id}>
            {bug.description}
            <button
              className='rounded border bg-white'
              onClick={() => dispatch(resolveBug(bug.id))}>
              Mark Resolved
            </button>
          </li>
        </>
      ))}
    </ul>
  )
}

export default Bugs
