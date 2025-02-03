import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoute />', () => {

    test('Debe de mostrar el children sino esta autenticado', () => {

        Storage.prototype.setItem = jest.fn();
    
        const contextValue = {
            logged: true,
            user: {id: 123, name: 'Francisco'}
        }

        const entry = '/marvel';

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ [entry] }>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', entry );

    });

});