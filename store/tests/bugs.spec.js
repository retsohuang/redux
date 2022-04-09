import { addBug, getUnresolvedBugs, loadBugs, resolveBug } from '@/store/bugs'
import createStore from '@/store/createStore'

describe('bugsSlice', () => {
  let store

  const bugsSlice = () => store.getState().entities.bugs

  const createState = () => ({
    entities: {
      bugs: {
        list: []
      }
    }
  })

  beforeEach(() => {
    store = createStore()
    fetch.resetMocks()
  })

  it(`should add the bug to the store if it's saved to the server`, async () => {
    const bug = { description: 'a' }
    const savedBug = { ...bug, id: 1 }
    fetchMock.mockResponse(JSON.stringify(savedBug))

    await store.dispatch(addBug(bug))

    expect(bugsSlice().list).toContainEqual(savedBug)
  })

  it(`should not add the bug to the store if it's not saved to the server`, async () => {
    const bug = { description: 'a' }
    fetchMock.mockResponse(JSON.stringify({}), { status: 500 })

    await store.dispatch(addBug(bug))

    expect(bugsSlice().list).toHaveLength(0)
  })

  it(`should mark the bug as resolved if it's saved to the server`, async () => {
    fetchMock.once(JSON.stringify({ id: 1 })).once(JSON.stringify({ id: 1, resolved: true }))

    await store.dispatch(addBug({}))
    await store.dispatch(resolveBug(1))

    expect(bugsSlice().list[0].resolved).toBe(true)
  })

  it(`should not mark the bug as resolved if it's not saved to the server`, async () => {
    fetchMock.once(JSON.stringify({ id: 1 })).once(JSON.stringify({}), { status: 500 })

    await store.dispatch(addBug({}))
    await store.dispatch(resolveBug(1))

    expect(bugsSlice().list[0].resolved).not.toBe(true)
  })

  describe('loading bugs', () => {
    describe('if the bugs exist in the cache', () => {
      it('should not be fetched from the server again.', async () => {
        fetchMock.mockResponse(JSON.stringify([{ id: 1 }]))

        await store.dispatch(loadBugs())
        await store.dispatch(loadBugs())

        expect(fetch).toHaveBeenCalledTimes(1)
      })
    })

    describe(`if the bugs don't exist in the cache`, () => {
      it('should be fetched from the server and put in the store', async () => {
        fetchMock.mockResponse(JSON.stringify([{ id: 1 }]))

        await store.dispatch(loadBugs())

        expect(bugsSlice().list).toHaveLength(1)
      })

      describe('loading indicator', () => {
        it('should be true while fetching the bugs', async () => {
          fetchMock.mockResponse(JSON.stringify([{ id: 1 }]))

          store.dispatch(loadBugs())

          expect(bugsSlice().loading).toBe(true)
        })

        it('should be false after the bugs are fetched', async () => {
          fetchMock.mockResponse(JSON.stringify([{ id: 1 }]))

          await store.dispatch(loadBugs())

          expect(bugsSlice().loading).toBe(false)
        })

        it('should be false if the server returns an error', async () => {
          fetchMock.mockResponse(JSON.stringify([{ id: 1 }]), { status: 500 })

          await store.dispatch(loadBugs())

          expect(bugsSlice().loading).toBe(false)
        })
      })
    })
  })

  describe('selectors', () => {
    it('getUnresolvedBugs', async () => {
      const state = createState()
      state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }]

      const result = getUnresolvedBugs(state)

      expect(result).toHaveLength(2)
    })
  })
})
