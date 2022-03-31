const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action)

    if (action.type !== 'apiCallBegan') {
      return
    }

    const { url, method, data, onSuccess, onError } = action.payload
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        let error = new Error(response.statusText)
        throw error
      }

      const json = await response.json()

      dispatch({ type: onSuccess, payload: json })
    } catch (error) {
      dispatch({ type: onError, payload: error.message })
    }
  }

export default api
