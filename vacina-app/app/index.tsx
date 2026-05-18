import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useFocusEffect, router } from "expo-router";

import { useCallback, useState } from "react";

import {
  buscarVacinas,
  deletarVacina,
} from "../src/storage/vacinaStorage";

import { Vacina } from "../src/types/Vacina";

export default function Home() {
  const [vacinas, setVacinas] =
    useState<Vacina[]>([]);

  async function carregarVacinas() {
    const response =
      await buscarVacinas();

    setVacinas(response);
  }

  async function remover(id: string) {
    await deletarVacina(id);

    carregarVacinas();
  }

  useFocusEffect(
    useCallback(() => {
      carregarVacinas();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/nova-vacina")
        }
      >
        <Text style={styles.buttonText}>
          Nova Vacina
        </Text>
      </TouchableOpacity>

      <FlatList
        data={vacinas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.nomeVacina}
            </Text>

            <Text>
              Dose: {item.dose}
            </Text>

            <Text>
              Data: {item.data}
            </Text>

            <View
              style={styles.actions}
            >
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  router.push({
                    pathname:
                      "/editar-vacina",
                    params: item,
                  })
                }
              >
                <Text>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  remover(item.id)
                }
              >
                <Text>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },

  button: {
    backgroundColor: "#00A86B",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  editButton: {
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 8,
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
  },
});