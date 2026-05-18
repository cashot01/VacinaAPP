import AsyncStorage from "@react-native-async-storage/async-storage";

import { Usuario } from "../types/Usuario";

const USER_KEY = "@usuario";
const SESSION_KEY = "@sessao";

export async function cadastrarUsuario(
  usuario: Usuario
) {
  await AsyncStorage.setItem(
    USER_KEY,
    JSON.stringify(usuario)
  );
}

export async function buscarUsuario(): Promise<Usuario | null> {
  const response =
    await AsyncStorage.getItem(USER_KEY);

  if (!response) {
    return null;
  }

  return JSON.parse(response);
}

export async function salvarSessao(
  usuario: Usuario
) {
  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify(usuario)
  );
}

export async function buscarSessao() {
  const response =
    await AsyncStorage.getItem(
      SESSION_KEY
    );

  if (!response) {
    return null;
  }

  return JSON.parse(response);
}

export async function logout() {
  await AsyncStorage.removeItem(
    SESSION_KEY
  );
}

export async function atualizarUsuario(
  usuario: Usuario
) {
  await AsyncStorage.setItem(
    USER_KEY,
    JSON.stringify(usuario)
  );

  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify(usuario)
  );
}

export async function excluirUsuario() {
  await AsyncStorage.removeItem(
    USER_KEY
  );

  await AsyncStorage.removeItem(
    SESSION_KEY
  );

  await AsyncStorage.removeItem(
    "@vacinas"
  );
}