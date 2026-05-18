import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useState } from "react";

import uuid from "react-native-uuid";

import { router } from "expo-router";

import { salvarVacina } from "../src/storage/vacinaStorage";

export default function NovaVacina() {
  const [nomeVacina, setNomeVacina] =
    useState("");

  const [unidade, setUnidade] =
    useState("");

  const [data, setData] =
    useState("");

  const [dose, setDose] =
    useState("");

  async function salvar() {
    const vacina = {
      id: String(uuid.v4()),
      nomeVacina,
      unidade,
      data,
      lote: "",
      vacinador: "",
      registroProfissional: "",
      braco: "",
      dose,
    };

    await salvarVacina(vacina);

    router.back();
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <TextInput
        placeholder="Nome vacina"
        placeholderTextColor="#999"
        style={styles.input}
        value={nomeVacina}
        onChangeText={setNomeVacina}
      />

      <TextInput
        placeholder="Unidade"
        placeholderTextColor="#999"
        style={styles.input}
        value={unidade}
        onChangeText={setUnidade}
      />

      <TextInput
        placeholder="Data"
        placeholderTextColor="#999"
        style={styles.input}
        value={data}
        onChangeText={setData}
      />

      <TextInput
        placeholder="Dose"
        placeholderTextColor="#999"
        style={styles.input}
        value={dose}
        onChangeText={setDose}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={salvar}
      >
        <Text style={styles.buttonText}>
          Salvar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    backgroundColor: "#121212",
    flexGrow: 1,
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