import {render} from '@testing-library/react'
import React from 'react'

import SignupForm from '../../components/SignUpSection/SignUpForm';

test( 'test login entidad', () => {
  
    const { getByTestId } = render( <SignupForm /> );

    const entidad = getByTestId( 'entidad' );
    expect( entidad ).toBeInTheDocument();


}
)
      