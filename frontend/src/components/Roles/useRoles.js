import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_ROLES = gql`
  {
    roles{
    name
  }
  }
`;

function useRoles() {

    const { data } = useQuery(GET_ROLES);
      
      return data!=null?data.roles:[];
}

export default useRoles