import {
  createContext,
  useEffect,
  useState,
} from "react";

import { router } from "expo-router";

import {
  buscarSessao,
  logout as logoutStorage,
  salvarSessao,
} from "../storage/authStorage";

type AuthContextProps = {
  usuario: any;
  login: (usuario: any) => void;
  logout: () => void;
};

export const AuthContext =
  createContext({} as AuthContextProps);

export function AuthProvider({
  children,
}: any) {
  const [usuario, setUsuario] =
    useState(null);

  async function carregarSessao() {
    const sessao =
      await buscarSessao();

    if (sessao) {
      setUsuario(sessao);

      router.replace(
        "/(protected)"
      );
    } else {
      router.replace("/(auth)/login");
    }
  }

  useEffect(() => {
    carregarSessao();
  }, []);

  async function login(usuario: any) {
    setUsuario(usuario);

    await salvarSessao(usuario);

    router.replace("/(protected)");
  }

  async function logout() {
    setUsuario(null);

    await logoutStorage();

    router.replace("/(auth)/login");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}