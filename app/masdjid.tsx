import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from "expo-constants";
import { Back } from '../assets/Svg/Svg';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useRedirectIfRoleNotAllowed } from '@/hooks/useRedirectIfRoleNotAllowed';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const Masdjid = () => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState<'mosquee' | 'config'>('mosquee');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

    const user = useSelector((state: any) => state.user.value);
useRedirectIfRoleNotAllowed(user, ["admin", "gerant", "imam", "dev"]);


  useEffect(() => {
    const fetchMosquee = async () => {
      try {
        const res = await fetch(`${API_URL}/mosquees/1`);
        const response = await res.json();
        setData(response.data || {});
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMosquee();
  }, []);

  const handleSave = async () => {
    try {
      await fetch(`${API_URL}/mosquees/update/${data.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setSaveMessage("Modifications enregistrées !");
      setTimeout(() => setSaveMessage(null), 4000);
    } catch (err) {
      setSaveMessage("Erreur lors de l'enregistrement");
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Pressable style={styles.buttonBack} onPress={() => router.back()}>
        <Back rotate={'0deg'} fill={'#333'} />
      </Pressable>
      <Text style={styles.mainTitle}>Mosquée</Text>
      <View style={styles.menu}>
        <Pressable onPress={() => setCurrentMenu('mosquee')}>
          <Text style={[
            styles.menuItem,
            { backgroundColor: currentMenu === 'mosquee' ? "#04bf94" : 'rgba(4, 191, 148, 0.1)', color: currentMenu === 'mosquee' ? "#fff" : "#04bf94" }
          ]}>Mosquée</Text>
        </Pressable>
        <Pressable onPress={() => setCurrentMenu('config')}>
          <Text style={[
            styles.menuItem,
            { backgroundColor: currentMenu === 'config' ? "#04bf94" : 'rgba(4, 191, 148, 0.1)', color: currentMenu === 'config' ? "#fff" : "#04bf94" }
          ]}>Configuration</Text>
        </Pressable>
      </View>
      {loading ? (
        <Text style={styles.loading}>Chargement...</Text>
      ) : (
        <>
          <ScrollView style={{ padding: 20, paddingBottom: 80 }}>
            {currentMenu === 'mosquee' && data && (
              <>
                <Text style={styles.label}>Nom</Text>
                <TextInput style={styles.input} value={data.name || ''} editable={true} onChangeText={val => setData((prev: any) => ({ ...prev, name: val }))} />
                <Text style={styles.label}>Adresse</Text>
                <TextInput style={styles.input} value={data.address || ''} editable={true} onChangeText={val => setData((prev: any) => ({ ...prev, address: val }))} />
                <Text style={styles.label}>Ville</Text>
                <TextInput style={styles.input} value={data.city || ''} editable={true} onChangeText={val => setData((prev: any) => ({ ...prev, city: val }))} />
                <Text style={styles.label}>Code postal</Text>
                <TextInput
                  style={styles.input}
                  value={data.zip || ''}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={val => setData((prev: any) => ({ ...prev, zip: val }))}
                />
                <Text style={styles.label}>Pays</Text>
                <TextInput style={styles.input} value={data.country || ''} editable={true} onChangeText={val => setData((prev: any) => ({ ...prev, country: val }))} />
                <Text style={styles.label}>Numéro</Text>
                <TextInput
                  style={styles.input}
                  value={data.numero || ''}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={val => setData((prev: any) => ({ ...prev, numero: val }))}
                />
                <Text style={styles.label}>Facebook</Text>
                <TextInput style={styles.input} value={data.facebook || ''} editable={true} onChangeText={val => setData((prev: any) => ({ ...prev, facebook: val }))} />
                <Text style={styles.label}>Instagram</Text>
                <TextInput style={styles.input} value={data.instagram || ''} editable={true} onChangeText={val => setData((prev: any) => ({ ...prev, instagram: val }))} />
                <Text style={styles.label}>X (Twitter)</Text>
                <TextInput style={styles.input} value={data.x || ''} editable={true} onChangeText={val => setData((prev: any) => ({ ...prev, x: val }))} />
                <Text style={styles.label}>Disponible</Text>
                <View style={styles.selectContainer}>
                  <Text style={styles.selectLabel}>Disponible :</Text>
                  <Picker
                    selectedValue={data.isAvailable === 1 ? "oui" : "non"}
                    style={{ flex: 1 }}
                    onValueChange={val =>
                      setData((prev: any) => ({
                        ...prev,
                        isAvailable: val === "oui" ? 1 : 0
                      }))
                    }
                  >
                    <Picker.Item label="Oui" value="oui" />
                    <Picker.Item label="Non" value="non" />
                  </Picker>
                </View>
              </>
            )}
            {currentMenu === 'config' && data && (
              <>
                <Text style={styles.label}>Nb Jumuas</Text>
                <TextInput
                  style={styles.input}
                  value={data.nb_jumuas?.toString() || ''}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={val => setData((prev: any) => ({ ...prev, nb_jumuas: val }))}
                />
                <Text style={styles.label}>Jumuas</Text>
                <TextInput style={styles.input} value={data.jumuas || ''} editable={true} onChangeText={val => setData((prev : any) => ({ ...prev, jumuas: val }))} />
                <Text style={styles.label}>Iqama Fajr</Text>
                <TextInput
                  style={styles.input}
                  value={data.iqama_fajr || ''}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={val => setData((prev : any) => ({ ...prev, iqama_fajr: val }))}
                />
                <Text style={styles.label}>Iqama Dhor</Text>
                <TextInput
                  style={styles.input}
                  value={data.iqama_dhor || ''}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={val => setData((prev : any) => ({ ...prev, iqama_dhor: val }))}
                />
                <Text style={styles.label}>Iqama Asr</Text>
                <TextInput
                  style={styles.input}
                  value={data.iqama_asr || ''}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={val => setData((prev : any) => ({ ...prev, iqama_asr: val }))}
                />
                <Text style={styles.label}>Iqama Maghrib</Text>
                <TextInput
                  style={styles.input}
                  value={data.iqama_maghrib || ''}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={val => setData((prev : any) => ({ ...prev, iqama_maghrib: val }))}
                />
                <Text style={styles.label}>Iqama Isha</Text>
                <TextInput
                  style={styles.input}
                  value={data.iqama_isha || ''}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={val => setData((prev : any) => ({ ...prev, iqama_isha: val }))}
                />
              </>
            )}
          </ScrollView>
          <Pressable
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </Pressable>
          {saveMessage && (
            <Text style={styles.saveToast}>{saveMessage}</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: "center",
    padding: 32,
    backgroundColor: "#04bf94",
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    top: 55,
    paddingLeft: 10,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: "#333",
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: "#f8f8f8",
    color: "#333",
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectLabel: {
    fontWeight: 'bold',
    color: "#333",
    marginRight: 10,
  },
  selectValue: {
    color: "#04bf94",
    fontWeight: 'bold',
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: "#04bf94",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center"
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  saveMessage: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    marginTop: 10,
  },
  saveToast: {
    color: "#fff",
    backgroundColor: "#04bf94",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    borderRadius: 5,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default Masdjid;
