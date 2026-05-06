import { User } from '../types';

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const user: User = {
          id: 'u1',
          email,
          name: email.split('@')[0],
          role: 'customer'
        };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const register = (name: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: 'u2',
        email,
        name,
        role: 'customer'
      };
      localStorage.setItem('user', JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
};