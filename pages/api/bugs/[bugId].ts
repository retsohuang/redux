import { NextApiRequest, NextApiResponse } from 'next'

const bugs = [
  { id: 1, description: 'Bug 1', userId: 1, resolved: true },
  { id: 2, description: 'Bug 2', userId: 1 },
  { id: 3, description: 'Bug 3', userId: 2 },
  { id: 4, description: 'Bug 4' }
]

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  switch (request.method) {
    case 'PATCH':
      const id = Number(request.query.bugId)
      const index = bugs.findIndex((bug) => bug.id === id)

      if (index === -1) {
        response.status(404).end()
        return
      }

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
