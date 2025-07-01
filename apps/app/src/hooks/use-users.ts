'use client';

import { useQuery } from '@tanstack/react-query';
import { getUsersWithPhonesAction } from '../actions';

export function useUsersWithPhones() {
    return useQuery({
        queryKey: ['users-with-phones'],
        queryFn: getUsersWithPhonesAction,
    });
}
