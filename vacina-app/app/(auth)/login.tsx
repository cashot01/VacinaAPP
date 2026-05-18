import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { useContext, useState } from "react";

import { router } from "expo-router";

import { AuthContext } from "../../src/context/AuthContext";

import { buscarUsuario } from "../../src/storage/authStorage";

export default function Login() {
  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  async function entrar() {
    const usuarioSalvo =
      await buscarUsuario();

    if (!usuarioSalvo) {
      Alert.alert(
        "Erro",
        "Nenhum usuário cadastrado"
      );

      return;
    }

    const emailCorreto =
      usuarioSalvo.email.trim();

    const senhaCorreta =
      usuarioSalvo.senha.trim();

    const emailDigitado =
      email.trim();

    const senhaDigitada =
      senha.trim();

    if (
      emailDigitado !== emailCorreto ||
      senhaDigitada !== senhaCorreta
    ) {
      Alert.alert(
        "Erro",
        "Credenciais inválidas"
      );

      return;
    }

    await login(usuarioSalvo);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#999"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={entrar}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push(
            "/(auth)/cadastro"
          )
        }
      >
        <Text style={styles.link}>
          Criar conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 20,
    gap: 15,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
  },

  button: {
    backgroundColor: "#00A86B",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  link: {
    color: "#00A86B",
    textAlign: "center",
  },
});