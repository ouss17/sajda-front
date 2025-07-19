import React from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  category: any;
  name: string;
  setName: (v: string) => void;
  comment: string;
  setComment: (v: string) => void;
  urlName: string;
  setUrlName: (v: string) => void;
  onSave: () => void;
  loading: boolean;
}

const CategoryModal = ({
  visible, onClose, category, name, setName, comment, setComment, urlName, setUrlName, onSave, loading
}: CategoryModalProps) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nom de la catégorie"
        />
        <Text style={styles.label}>Commentaire</Text>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          placeholder="Commentaire"
        />
        <View style={styles.actions}>
          <Pressable style={[styles.button, { backgroundColor: '#ccc' }]} onPress={onClose}>
            <Text style={styles.buttonText}>Fermer</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#04bf94' }]} onPress={onSave} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Enregistrement...' : 'Enregistrer'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '90%' },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { borderRadius: 8, paddingVertical: 10, alignItems: 'center', flex: 1, marginHorizontal: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default CategoryModal;