import AsyncStorage from "@react-native-async-storage/async-storage";

import { Vacina } from "../types/Vacina";

const STORAGE_KEY = "@vacinas";

export async function buscarVacinas(): Promise<Vacina[]> {
  const response = await AsyncStorage.getItem(STORAGE_KEY);

  return response ? JSON.parse(response) : [];
}

export async function salvarVacina(
  vacina: Vacina
) {
  const vacinas = await buscarVacinas();

  const novaLista = [...vacinas, vacina];

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(novaLista)
  );
}

export async function atualizarVacina(
  vacinaAtualizada: Vacina
) {
  const vacinas = await buscarVacinas();

  const novaLista = vacinas.map((vacina) =>
    vacina.id === vacinaAtualizada.id
      ? vacinaAtualizada
      : vacina
  );

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(novaLista)
  );
}

export async function deletarVacina(
  id: string
) {
  const vacinas = await buscarVacinas();

  const novaLista = vacinas.filter(
    (vacina) => vacina.id !== id
  );

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(novaLista)
  );
}