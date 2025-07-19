import React from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface UserModalProps {
  visible: boolean;
  onClose: () => void;
  user: any;
  role: string;
  onRoleChange: (role: string) => void;
  onSave: () => void;
  loading?: boolean;
}

const UserModal = ({ visible, onClose, user, role, onRoleChange, onSave, loading }: UserModalProps) => {
  if (!user) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Informations utilisateur</Text>
          <Text style={styles.label}>Pseudo</Text>
          <Text style={styles.value}>{user.pseudo || 'N/A'}</Text>
          <Text style={styles.label}>Prénom</Text>
          <Text style={styles.value}>{user.firstname || 'N/A'}</Text>
          <Text style={styles.label}>Nom</Text>
          <Text style={styles.value}>{user.lastname || 'N/A'}</Text>
          <Text style={styles.label}>Date de naissance</Text>
          <Text style={styles.value}>
            {user.birthdate
              ? new Date(user.birthdate).toLocaleDateString('fr-FR')
              : 'N/A'}
          </Text>
          <Text style={styles.label}>Rôle</Text>
          <Picker
            selectedValue={role}
            enabled={user.role !== 'admin'}
            style={[styles.input, user.role === 'admin' && { backgroundColor: '#eee', color: '#888' }]}
            onValueChange={onRoleChange}
          >
            <Picker.Item label="Utilisateur" value="user" />
            <Picker.Item label="Gérant" value="gerant" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
          <View style={styles.actions}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Fermer</Text>
            </Pressable>
            {user.role !== 'admin' && (
              <Pressable style={styles.button} onPress={onSave} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Enregistrement...' : 'Enregistrer'}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '85%' },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 16, textAlign: 'center' },
  label: { fontWeight: 'bold', marginTop: 10 },
  value: { marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#04bf94', borderRadius: 8, marginBottom: 10, color: '#333' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { backgroundColor: '#04bf94', borderRadius: 8, padding: 10, marginHorizontal: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default UserModal;