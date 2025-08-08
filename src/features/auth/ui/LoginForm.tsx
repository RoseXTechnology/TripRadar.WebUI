import { useState } from 'react';
import { Button, Input } from 'shared/ui';
import { useForm, authValidation } from 'shared/lib';
import { useAuth } from '../model/useAuth';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, loginLoading } = useAuth();
  const { values, errors, setValue, setError } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const emailError = authValidation.email(values.email);
    const passwordError = authValidation.password(values.password);

    if (emailError) setError('email', emailError);
    if (passwordError) setError('password', passwordError);

    if (emailError || passwordError) return;

    try {
      await login(values);
      onSuccess?.();
    } catch (error) {
      setError('password', 'Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={values.email}
        onChange={e => setValue('email', e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        value={values.password}
        onChange={e => setValue('password', e.target.value)}
        error={errors.password}
        required
      />

      <Button type="submit" loading={loginLoading} className="w-full">
        Sign In
      </Button>
    </form>
  );
}
