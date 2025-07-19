import React from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PostModalProps {
  visible: boolean;
  onClose: () => void;
  post: any;
  categories: any[];
  selectedCategory: number;
  onCategoryChange: (id: number) => void;
  active: boolean;
  onActiveChange: (value: boolean) => void;
  onSave: () => void;
  loading?: boolean;
  title: string;
  content: string;
  onTitleChange: (v: string) => void;
  onContentChange: (v: string) => void;
  media?: string;
  onMediaChange?: (v: string) => void;
  onDelete?: () => void;
}

const PostModal = ({
  visible,
  onClose,
  post,
  categories,
  selectedCategory,
  onCategoryChange,
  active,
  onActiveChange,
  onSave,
  loading,
  title,
  content,
  onTitleChange,
  onContentChange,
  media,
  onMediaChange,
  onDelete,
}: PostModalProps) => {

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Détail de la publication</Text>
          <Text style={styles.label}>Titre</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={onTitleChange}
            placeholder="Titre"
          />
          <Text style={styles.label}>Contenu</Text>
          <TextInput
            style={[styles.input, { minHeight: 60 }]}
            value={content}
            onChangeText={onContentChange}
            placeholder="Contenu"
            multiline
          />
          <Text style={styles.label}>Catégorie</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={onCategoryChange}
            style={styles.input}
          >
            {categories.map(cat => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
          </Picker>
          <Text style={styles.label}>Active</Text>
          <Picker
            selectedValue={active ? "oui" : "non"}
            onValueChange={v => onActiveChange(v === "oui")}
            style={styles.input}
          >
            <Picker.Item label="Oui" value="oui" />
            <Picker.Item label="Non" value="non" />
          </Picker>
          <Text style={styles.label}>Date de création</Text>
          <Text style={styles.value}>{post.created_at ? post.created_at.split('T')[0] : 'N/A'}</Text>
          {onMediaChange && (
            <>
              <Text style={styles.label}>Media</Text>
              <TextInput
                style={styles.input}
                value={media}
                onChangeText={onMediaChange}
                placeholder="Lien ou texte media"
              />
            </>
          )}
          <View style={styles.actions}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Fermer</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onSave} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Enregistrement...' : 'Enregistrer'}</Text>
            </Pressable>
          </View>
          {onDelete && post?.id && (
            <Pressable style={[styles.button, { backgroundColor: '#ff4655' }]} onPress={onDelete}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </Pressable>
          )}
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
  input: { borderWidth: 1, borderColor: '#04bf94', borderRadius: 8, marginBottom: 10, color: '#333', padding: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { backgroundColor: '#04bf94', borderRadius: 8, padding: 10, marginHorizontal: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default PostModal;