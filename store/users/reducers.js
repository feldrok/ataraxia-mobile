import { createReducer } from '@reduxjs/toolkit'
import userActions from './actions'

const { signIn, signInToken, addUser, verifyUser, signout, getProfile } =
    userActions

const initialState = {
    user: [],
    profile: {},
    message: '',
    isAuthenticated: false,
}

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(signIn.fulfilled, (state, action) => {
            let newState = {
                user: action.payload.user,
                profile: state.profile,
                isAuthenticated: state.isAuthenticated,
                message: action.payload.message,
            }
            return newState
        })
        .addCase(signIn.rejected, (state, action) => {
            let newState = {
                message: 'error',
            }
            return newState
        })
        .addCase(signInToken.fulfilled, (state, action) => {
            let newState = {
                user: action.payload.user,
                profile: state.profile,
                isAuthenticated: true,
                message: action.payload.message,
            }
            return newState
        })
        .addCase(signInToken.rejected, (state, action) => {
            let newState = {
                isAuthenticated: false,
                message: 'error',
            }
            return newState
        })
        .addCase(addUser.fulfilled, (state, action) => {
            let newState = {
                user: action.payload.user,
                profile: state.profile,
                message: action.payload.message,
            }
            return newState
        })
        .addCase(addUser.rejected, (state, action) => {
            let newState = {
                message: 'Error!',
            }
            return newState
        })
        .addCase(verifyUser.fulfilled, (state, action) => {
            let newState = {
                message: action.payload.message,
            }
            return newState
        })
        .addCase(verifyUser.rejected, (state, action) => {
            let newState = {
                message: action.payload.message,
            }
            return newState
        })
        .addCase(signout.fulfilled, (state, action) => {
            let newState = {
                user: [],
                isAuthenticated: false,
                message: 'Sesión cerrada correctamente',
            }
            return newState
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            let newState = {
                profile: action.payload.user,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                message: action.payload.message,
            }
            return newState
        })
})

export default userReducer
