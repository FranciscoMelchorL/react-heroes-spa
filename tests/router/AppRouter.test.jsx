import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter';
import { AuthContext } from '../../src/auth';

describe('Pruebas en <AppRouter />', () => {

    test('Debe de mostrar el login sino esta autenticado', () => {

        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={ ['/marvel'] }>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBe(2);

    });

    test('Debe de mostrar el componente de Marvel si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {id: 123, name: 'Francisco'}
        }

        render(
            <MemoryRouter initialEntries={ ['/login'] }>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('Marvel Comics') ).toBeTruthy();
        expect( screen.getByText(contextValue.user.name) ).toBeTruthy();

    });

});