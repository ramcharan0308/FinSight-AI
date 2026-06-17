import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutState = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      router.push('/');
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name?: string }) =>
      authService.register(email, password, name),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      router.push('/');
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) =>
      authService.updateProfile(name, email),
    onSuccess: (data) => {
      updateUser({ name: data.name, email: data.email });
    },
  });

  const logout = () => {
    logoutState();
    router.push('/login');
  };

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,
    logout,
  };
};
