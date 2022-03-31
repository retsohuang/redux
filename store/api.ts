import { createAction } from '@reduxjs/toolkit'

export const callBegan = createAction<any>('api/callBegan')
export const callSuccess = createAction('api/callSuccess')
export const callFailed = createAction('api/callFailed')
