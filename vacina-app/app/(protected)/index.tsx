import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  useFocusEffect,
  router,
} from "expo-router";

import {
  useCallback,
  useState,
  useContext,
} from "react";

import {
  buscarVacinas,
  deletarVacina,
} from "../../src/storage/vacinaStorage";

import { Vacina } from "../../src/types/Vacina";

import { AuthContext } from "../../src/context/AuthContext";

export default function Home() {
  const [vacinas, setVacinas] =
    useState<Vacina[]>([]);

  const { logout } =
    useContext(AuthContext);

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
          router.push(
            "/(protected)/nova-vacina"
          )
        }
      >
        <Text style={styles.buttonText}>
          Nova Vacina
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          router.push(
            "/(protected)/perfil"
          )
        }
      >
        <Text style={styles.buttonText}>
          Perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.buttonText}>
          Logout
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

            <Text style={styles.text}>
              Dose: {item.dose}
            </Text>

            <Text style={styles.text}>
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
                      "/(protected)/editar-vacina",

                    params: item,
                  })
                }
              >
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.deleteButton
                }
                onPress={() =>
                  remover(item.id)
                }
              >
                <Text
                  style={
                    styles.buttonText
                  }
                >
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
    marginBottom: 10,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
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

  text: {
    color: "#fff",
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