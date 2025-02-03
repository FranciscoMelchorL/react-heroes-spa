import { fireEvent, render, screen } from '@testing-library/react';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';
import { MemoryRouter, useNavigate } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => (
    {
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUseNavigate,
    }
));

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <SearchPage />
            </MemoryRouter>
        );

        const inputValue = screen.getByRole('textbox');
        expect( inputValue.value ).toBe( 'batman' );

        const imgValue = screen.getByRole('img');
        expect( imgValue.src ).toContain( '/heroes/dc-batman.jpg' );

        const divElement = screen.getByLabelText('search-hero');
        expect( divElement.style.display ).toBe( 'none' );

    });

    test('Debe de mostrar un error sino se muestra el hero', () => {

        render(
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <SearchPage />
            </MemoryRouter>
        );

        const divElement = screen.getByLabelText('no-hero');
        expect( divElement.style.display ).toBe('');

    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {

        render(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchPage />
            </MemoryRouter>
        );

        const inputElement = screen.getByRole('textbox');
        const formElement = screen.getByRole('form');

        fireEvent.change( inputElement, {target: {name: 'searchText', value: 'superman'}} );
        fireEvent.submit( formElement );

        expect( mockedUseNavigate ).toHaveBeenCalledWith( '?q=superman' );

    });

});