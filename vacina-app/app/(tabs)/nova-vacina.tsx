import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { useState } from "react";

import uuid from "react-native-uuid";

import { router } from "expo-router";

import { salvarVacina } from "../../src/storage/vacinaStorage";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Picker } from "@react-native-picker/picker";

export default function NovaVacina() {
  const [nomeVacina, setNomeVacina] =
    useState("");

  const [unidade, setUnidade] =
    useState("");

  const [data, setData] =
    useState("");

  const [dose, setDose] =
    useState("");

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [braco, setBraco] =
    useState("");

  async function salvar() {
    if (
      !nomeVacina.trim() ||
      !unidade.trim() ||
      !data.trim() ||
      !dose.trim() ||
      !braco.trim()
    ) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos"
      );

      return;
    }

    const vacina = {
      id: String(uuid.v4()),

      nomeVacina:
        nomeVacina.trim(),

      unidade:
        unidade.trim(),

      data: data.trim(),

      dose: dose.trim(),

      braco: braco.trim(),
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

      <TouchableOpacity
        style={styles.input}
        onPress={() =>
          setShowDatePicker(true)
        }
      >
        <Text style={{ color: "#fff" }}>
          {data || "Selecionar data"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              setData(
                selectedDate
                  .toLocaleDateString()
              );
            }
          }}
        />
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dose}
          onValueChange={(itemValue) =>
            setDose(itemValue)
          }
          dropdownIconColor="#fff"
          style={{
            color: "#fff",
          }}
        >
          <Picker.Item
            label="Selecione a dose"
            value=""
          />

          <Picker.Item
            label="1ª Dose"
            value="1ª Dose"
          />

          <Picker.Item
            label="2ª Dose"
            value="2ª Dose"
          />

          <Picker.Item
            label="3ª Dose"
            value="3ª Dose"
          />

          <Picker.Item
            label="Reforço"
            value="Reforço"
          />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={braco}
          onValueChange={(itemValue) =>
            setBraco(itemValue)
          }
          dropdownIconColor="#fff"
          style={{
            color: "#fff",
          }}
        >
          <Picker.Item
            label="Selecione o braço"
            value=""
          />

          <Picker.Item
            label="Esquerdo"
            value="Esquerdo"
          />

          <Picker.Item
            label="Direito"
            value="Direito"
          />
        </Picker>
      </View>

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

  pickerContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },
});