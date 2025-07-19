import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';

interface Category {
  id: number;
  name: string;
  comment: string;
  url_name: string;
}

interface DeleteCategoryProps {
  categories: Category[];
  loading: boolean;
  styles: any;
  onAskDelete: (cat: Category) => void;
  selectedCategory: Category | null;
  deleteModalVisible: boolean;
  setDeleteModalVisible: (v: boolean) => void;
  handleDelete: () => void;
}

const DeleteCategory = ({
  categories, loading, styles, onAskDelete, selectedCategory, deleteModalVisible, setDeleteModalVisible, handleDelete
}: DeleteCategoryProps) => (
  <>
    <ScrollView style={styles.containerForm}>
      <View style={styles.list}>
        <Text style={[styles.titleForm, styles.postTitle]}>Nom</Text>
        <Text style={styles.titleForm}>Commentaire</Text>
        <Text style={styles.titleForm}>Url</Text>
      </View>
      {loading ? (
        <Text style={styles.loading}>Chargement...</Text>
      ) : categories.length > 0 ? (
        categories.map((cat, index) => (
          <Pressable
            key={cat.id || index}
            style={[
              styles.items,
              { backgroundColor: (index % 2) ? '#ff4655' : "rgba(255, 70, 85, 0.08)" }
            ]}
            onPress={() => onAskDelete(cat)}
          >
            <Text style={[styles.postTitle, { color: (index % 2) ? "#fff" : "#ff4655" }]}>
              {cat.name || "N/A"}
            </Text>
            <Text style={{ color: (index % 2) ? "#fff" : "#ff4655", width: 120, textAlign: 'center' }}>
              {cat.comment || "N/A"}
            </Text>
            <Text style={{ color: (index % 2) ? "#fff" : "#ff4655", width: 80, textAlign: 'center' }}>
              {cat.url_name || "N/A"}
            </Text>
          </Pressable>
        ))
      ) : (
        <Text style={styles.loading}>Il n'y a pas de catégories</Text>
      )}
    </ScrollView>
    {deleteModalVisible && (
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', zIndex: 100
      }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '80%', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center', color: '#ff4655' }}>
            Êtes-vous sûr de vouloir supprimer{selectedCategory?.name ? ` "${selectedCategory.name}"` : ''} ?
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Pressable
              style={[styles.button, { backgroundColor: '#ccc', flex: 1, marginRight: 10 }]}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.buttonText}>Annuler</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: '#ff4655', flex: 1 }]}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Supprimer</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )}
  </>
);

export default DeleteCategory;