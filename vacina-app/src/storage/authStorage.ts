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

export async function buscarUsuario() {
  const response =
    await AsyncStorage.getItem(USER_KEY);

  return response
    ? JSON.parse(response)
    : null;
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

  return response
    ? JSON.parse(response)
    : null;
}

export async function logout() {
  await AsyncStorage.removeItem(
    SESSION_KEY
  );
}