import { types } from '../types/types';
import PropTypes, { object } from 'prop-types';

export const authReducer = (state = {}, action) =>{
    
    switch (action.type) {
        
        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload
            }

        case types.logout:
            return {
                logged: false,
            }
    
        default:
            return state;
    }
}

authReducer.propTypes = {
    state: PropTypes.object,
    action: PropTypes,object,
}