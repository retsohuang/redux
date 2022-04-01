import { NextApiRequest, NextApiResponse } from 'next'

const bugs = [
  { id: 1, description: 'Bug 1', userId: 1, resolved: true },
  { id: 2, description: 'Bug 2', userId: 1 },
  { id: 3, description: 'Bug 3', userId: 2 },
  { id: 4, description: 'Bug 4' }
]

let lastId = 0

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  switch (request.method) {
    case 'GET':
      response.status(200).json(bugs)
      break
    case 'POST':
      const newBug = { id: ++lastId, resolved: false, ...request.body }
      bugs.push(newBug)

      response.status(201).json(newBug)
      break
    default:
      response.status(405).end()
      break
  }
}
