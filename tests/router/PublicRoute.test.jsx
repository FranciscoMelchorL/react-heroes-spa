import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PublicRoute } from '../../src/router/PublicRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Pruebas en <PublicRoute />', () => {

    test('Debe de mostrar el children sino esta autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta publica') ).toBeTruthy();

    });

    test('Debe de navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {id: 123, name: 'Francisco'}
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/login'] }>
                    <Routes>
                        <Route path='/login' element={
                            <PublicRoute>
                                <h1>Ruta publica</h1>
                            </PublicRoute>}
                        />

                        <Route path={localStorage.getItem('lastPath') || '/'} element={<h1>Pagina Marvel</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Pagina Marvel') ).toBeTruthy();

    });

});