import { addBug } from '@/store/bugs'
import createStore from '@/store/createStore'

describe('bugsSlice', () => {
  let store

  const bugsSlice = () => store.getState().entities.bugs

  beforeEach(() => {
    store = createStore()
    fetch.resetMocks()
  })

  it(`should add the bug to the store if it's saved to the server`, async () => {
    const bug = { description: 'a' }
    const savedBug = { ...bug, id: 1 }
    fetchMock.mockResponseOnce(JSON.stringify(savedBug))

    await store.dispatch(addBug(bug))

    expect(bugsSlice().list).toContainEqual(savedBug)
  })

  it(`should not add the bug to the store if it's not saved to the server`, async () => {
    const bug = { description: 'a' }
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 })

    await store.dispatch(addBug(bug))

    expect(bugsSlice().list).toHaveLength(0)
  })
})
