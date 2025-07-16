export const userQueryKeys = {
  all: ['user'] as const,
  profile: () => [...userQueryKeys.all, 'profile'] as const,
  studies: () => [...userQueryKeys.all, 'studies'] as const,
} as const;
