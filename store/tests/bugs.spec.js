import { addBug } from '@/store/bugs'
import createStore from '@/store/createStore'

describe('bugsSlice', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should handle the addBug action', async () => {
    const store = createStore()
    const bug = { description: 'a' }
    const savedBug = { ...bug, id: 1 }

    fetchMock.mockResponseOnce(JSON.stringify(savedBug))

    await store.dispatch(addBug(bug))

    expect(store.getState().entities.bugs.list).toContainEqual(savedBug)
  })
})
