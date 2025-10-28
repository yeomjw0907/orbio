import { supabase } from './supabase';
import { User } from '../types';

export const authApi = {
  // 이메일/비밀번호로 로그인
  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        // 사용자 프로필 정보 가져오기
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.warn('프로필 정보를 가져올 수 없습니다:', profileError);
        }

        const user: User = {
          id: data.user.id,
          name: profile?.name || data.user.email?.split('@')[0] || '사용자',
          email: data.user.email || '',
          role: profile?.role || 'user',
          createdAt: new Date(data.user.created_at),
          lastLogin: new Date(),
        };

        return { user, error: null };
      }

      return { user: null, error: '로그인에 실패했습니다.' };
    } catch (error) {
      return { user: null, error: '로그인 중 오류가 발생했습니다.' };
    }
  },

  // 로그아웃
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      return { error: '로그아웃 중 오류가 발생했습니다.' };
    }
  },

  // 현재 사용자 정보 가져오기
  async getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        return { user: null, error: error.message };
      }

      if (user) {
        // 사용자 프로필 정보 가져오기
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.warn('프로필 정보를 가져올 수 없습니다:', profileError);
        }

        const userData: User = {
          id: user.id,
          name: profile?.name || user.email?.split('@')[0] || '사용자',
          email: user.email || '',
          role: profile?.role || 'user',
          createdAt: new Date(user.created_at),
          lastLogin: new Date(),
        };

        return { user: userData, error: null };
      }

      return { user: null, error: null };
    } catch (error) {
      return { user: null, error: '사용자 정보를 가져오는 중 오류가 발생했습니다.' };
    }
  },

  // 관리자 계정 생성 (개발용)
  async createAdmin(email: string, password: string, name: string): Promise<{ error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // 프로필 생성
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name,
              email,
              role: 'admin',
              created_at: new Date().toISOString(),
            }
          ]);

        if (profileError) {
          return { error: '프로필 생성 중 오류가 발생했습니다.' };
        }
      }

      return { error: null };
    } catch (error) {
      return { error: '관리자 계정 생성 중 오류가 발생했습니다.' };
    }
  },

  // 인증 상태 변경 감지
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { user } = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  }
};
