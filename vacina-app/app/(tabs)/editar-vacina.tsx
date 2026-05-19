import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Picker } from "@react-native-picker/picker";

import { atualizarVacina } from "../../src/storage/vacinaStorage";

export default function EditarVacina() {
  const params =
    useLocalSearchParams();

  const [nomeVacina, setNomeVacina] =
    useState(
      String(params.nomeVacina || "")
    );

  const [unidade, setUnidade] =
    useState(
      String(params.unidade || "")
    );

  const [data, setData] =
    useState(String(params.data || ""));

  const [dose, setDose] =
    useState(String(params.dose || ""));

  const [braco, setBraco] =
    useState(
      String(params.braco || "")
    );

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);

  async function salvarEdicao() {
    await atualizarVacina({
      id: String(params.id),

      nomeVacina,
      unidade,
      data,
      dose,
      braco,
    });

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
          onChange={(
            event,
            selectedDate
          ) => {
            setShowDatePicker(false);

            if (selectedDate) {
              setData(
                selectedDate.toLocaleDateString()
              );
            }
          }}
        />
      )}

      <View
        style={styles.pickerContainer}
      >
        <Picker
          selectedValue={dose}
          onValueChange={(
            itemValue
          ) => setDose(itemValue)}
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

      <View
        style={styles.pickerContainer}
      >
        <Picker
          selectedValue={braco}
          onValueChange={(
            itemValue
          ) =>
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
        onPress={salvarEdicao}
      >
        <Text style={styles.buttonText}>
          Salvar Alterações
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#121212",
    padding: 20,
    gap: 15,
  },

  input: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    justifyContent: "center",
  },

  pickerContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
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