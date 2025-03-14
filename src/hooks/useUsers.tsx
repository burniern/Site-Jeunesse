import { useState, useEffect } from 'react';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
}

const STORAGE_KEY = 'admin_users';

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@jeunessebiere.ch',
    role: 'Administrateur',
    lastLogin: new Date().toISOString()
  }
];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    }
    setLoading(false);
  }, []);

  const addUser = async (userData: Omit<User, 'id' | 'lastLogin'>) => {
    const newUser = {
      ...userData,
      id: users.length + 1,
      lastLogin: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    return newUser;
  };

  const updateUser = async (id: number, userData: Partial<User>) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, ...userData } : user
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const deleteUser = async (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return {
    users,
    loading,
    addUser,
    updateUser,
    deleteUser
  };
};