import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import { cadastrarUsuario } from "../../src/storage/authStorage";

export default function Cadastro() {
  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  async function cadastrar() {
    await cadastrarUsuario({
      nome,
      email,
      senha,
    });

    Alert.alert(
      "Sucesso",
      "Usuário criado"
    );

    router.replace("/(auth)/login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastro
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#999"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

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
        onPress={cadastrar}
      >
        <Text style={styles.buttonText}>
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
});