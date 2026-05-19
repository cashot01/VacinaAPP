import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import {
  useContext,
  useState,
} from "react";

import { router } from "expo-router";

import { AuthContext } from "../../src/context/AuthContext";

import {
  atualizarUsuario,
  excluirUsuario,
} from "../../src/storage/authStorage";

import {
  FontAwesome
} from "@expo/vector-icons";

export default function Perfil() {
  const {
    usuario,
    atualizarUsuarioContext,
    logout,
  } = useContext(AuthContext);

  const [nome, setNome] =
    useState(usuario?.nome || "");

  const [email, setEmail] =
    useState(usuario?.email || "");

  const [endereco, setEndereco] =
    useState(
      usuario?.endereco || ""
    );

  const [
    dataNascimento,
    setDataNascimento,
  ] = useState(
    usuario?.dataNascimento || ""
  );

  const [
    unidadeSaude,
    setUnidadeSaude,
  ] = useState(
    usuario?.unidadeSaude || ""
  );

  async function salvarPerfil() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !endereco.trim() ||
      !dataNascimento.trim() ||
      !unidadeSaude.trim()
    ) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos"
      );

      return;
    }

    const emailValido =
      /\S+@\S+\.\S+/;

    if (!emailValido.test(email)) {
      Alert.alert(
        "Erro",
        "Digite um email válido"
      );

      return;
    }

    const usuarioAtualizado = {
      ...usuario,

      nome: nome.trim(),

      email: email.trim(),

      endereco:
        endereco.trim(),

      dataNascimento:
        dataNascimento.trim(),

      unidadeSaude:
        unidadeSaude.trim(),
    };

    await atualizarUsuario(
      usuarioAtualizado
    );

    atualizarUsuarioContext(
      usuarioAtualizado
    );

    Alert.alert(
      "Sucesso",
      "Perfil atualizado"
    );
  }

  async function excluirConta() {
    Alert.alert(
      "Excluir conta",
      "Deseja realmente excluir sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Excluir",
          style: "destructive",

          onPress: async () => {
            await excluirUsuario();

            router.replace(
              "/(auth)/login"
            );
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <View style={styles.avatarContainer}>
        <FontAwesome
          name="user-circle"
          size={100}
          color="#00A86B"
        />
      </View>
      <Text style={styles.title}>
        Meu Perfil
      </Text>

      <View>
        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View>
        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View>
        <Text style={styles.label}>
          Endereço
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu endereço"
          placeholderTextColor="#999"
          value={endereco}
          onChangeText={setEndereco}
        />
      </View>

      <View>
        <Text style={styles.label}>
          Data de Nascimento
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua data"
          placeholderTextColor="#999"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />
      </View>

      <View>
        <Text style={styles.label}>
          Unidade de Saúde
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua unidade"
          placeholderTextColor="#999"
          value={unidadeSaude}
          onChangeText={setUnidadeSaude}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={salvarPerfil}
      >
        <Text style={styles.buttonText}>
          Salvar Alterações
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

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={excluirConta}
      >
        <Text style={styles.buttonText}>
          Excluir Conta
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

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "600",
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
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 10,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  logoutButton: {
    backgroundColor: "#F59E0B",
    padding: 15,
    borderRadius: 10,
  }
});