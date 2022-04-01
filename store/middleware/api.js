import * as apiActions from '@/store/api'

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiActions.callBegan.type) {
      return next(action)
    }

    const { url, method, data, onStart, onSuccess, onError } = action.payload

    if (onStart) {
      dispatch({ type: onStart })
    }

    next(action)

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

      dispatch(apiActions.callSuccess(json))

      if (onSuccess) {
        dispatch({ type: onSuccess, payload: json })
      }
    } catch (error) {
      dispatch(apiActions.callFailed({ errorMessage: error.message }))

      if (onError) {
        dispatch({ type: onError, payload: { errorMessage: error.message } })
      }
    }
  }

export default api
