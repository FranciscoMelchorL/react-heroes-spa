import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('Pruebas en authReducer', () => {

    const initialState = {
        user: {id: 123, name: 'Francisco',},
        logged: false,
    }

    test('Debe de retornar el estado por defecto', () => {

        const newState = authReducer( initialState, {} );
        expect( newState ).toBe( initialState );

    });
    
    test('Debe de llamar el login, autenticar y establecer el user', () => {

        const action = {
            type: types.login,
            payload: initialState.user,
        }

        const newState = authReducer( initialState, action );
        expect( newState.logged ).toBe( true );
        expect( newState.user ).toBe( action.payload );

    });

    test('Debe de borrar el name del usuario y logged en false', () => {

        const state = {
            user: {id: 123, name: 'Francisco',},
            logged: true,
        }
        
        const action = {
            type: types.logout,
        }

        const newState = authReducer( state, action );
        expect( newState.logged ).toBe( false );

    });

});