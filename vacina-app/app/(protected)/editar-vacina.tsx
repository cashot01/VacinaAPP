import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useState } from "react";

import { router } from "expo-router";

import { atualizarVacina } from "../../src/storage/vacinaStorage";

export default function EditarVacina() {
  const params =
    useLocalSearchParams();

  const [nomeVacina, setNomeVacina] =
    useState(
      String(params.nomeVacina)
    );

  const [unidade, setUnidade] =
    useState(String(params.unidade));

  const [data, setData] =
    useState(String(params.data));

  const [dose, setDose] =
    useState(String(params.dose));

  async function atualizar() {
    await atualizarVacina({
      id: String(params.id),
      nomeVacina,
      unidade,
      data,
      dose,
      lote: "",
      vacinador: "",
      registroProfissional: "",
      braco: "",
    });

    router.back();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nomeVacina}
        onChangeText={setNomeVacina}
      />

      <TextInput
        style={styles.input}
        value={unidade}
        onChangeText={setUnidade}
      />

      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setData}
      />

      <TextInput
        style={styles.input}
        value={dose}
        onChangeText={setDose}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={atualizar}
      >
        <Text style={styles.buttonText}>
          Atualizar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    gap: 15,
  },

  input: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
  },

  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});