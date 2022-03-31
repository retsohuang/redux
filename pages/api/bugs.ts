import { NextApiRequest, NextApiResponse } from 'next'

const bugs = [
  { id: 1, description: 'Bug 1', userId: 1, resolved: true },
  { id: 2, description: 'Bug 2', userId: 1 },
  { id: 3, description: 'Bug 3', userId: 2 },
  { id: 4, description: 'Bug 4' }
]

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  switch (request.method) {
    case 'GET':
      response.status(200).json(bugs)
      break
    case 'POST':
      const newBug = { id: Date.now(), resolved: false, ...request.body }
      bugs.push(newBug)

      response.status(201).json(newBug)
      break
    case 'PATCH':
      const id = Number(request.query.id)
      const index = bugs.findIndex((bug) => bug.id === id)
      const bug = bugs[index]
      if ('resolved' in request.body) {
        bug.resolved = request.body.resolved
      }
      if ('userId' in request.body) {
        bug.userId = request.body.userId
      }

      response.json(bug)
      break
    default:
      response.status(405).end()
      break
  }
}
