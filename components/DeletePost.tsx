import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

type Post = {
  id?: string | number;
  title?: string;
  content?: string;
  created_at?: string;
  active?: boolean;
};

type DeletePostProps = {
  posts: Post[];
  loading: boolean;
  styles: any;
  onAskDelete: (post: Post) => void;
  selectedPost?: Post | null;
  deleteModalVisible: boolean;
  setDeleteModalVisible: (visible: boolean) => void;
  handleDelete: () => void;
};

const DeletePost: React.FC<DeletePostProps> = ({
  posts, loading, styles, onAskDelete, selectedPost, deleteModalVisible,
  setDeleteModalVisible, handleDelete
}) => (
  <>
    <ScrollView style={styles.containerForm}>
      <View style={styles.list}>
        <Text style={[styles.titleForm, styles.postTitle]}>Titre</Text>
        <Text style={styles.titleForm}>Contenu</Text>
        <Text style={styles.titleForm}>Date</Text>
        <Text style={styles.titleForm}>Active</Text>
      </View>
      {loading ? (
        <Text style={styles.loading}>Chargement...</Text>
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <Pressable
            key={post.id || index}
            style={[
              styles.items,
              { backgroundColor: (index % 2) ? '#ff4655' : "rgba(255, 70, 85, 0.08)" }
            ]}
            onPress={() => onAskDelete(post)}
          >
            <Text style={[styles.postTitle, { color: (index % 2) ? "#fff" : "#ff4655" }]}>
              {post.title || "N/A"}
            </Text>
            <Text style={{ color: (index % 2) ? "#fff" : "#ff4655", width: 120, textAlign: 'center' }}>
              {post.content ? post.content.substring(0, 10) + (post.content.length > 10 ? "..." : "") : "N/A"}
            </Text>
            <Text style={{ color: (index % 2) ? "#fff" : "#ff4655", width: 80, textAlign: 'center' }}>
              {post.created_at ? post.created_at.split('T')[0] : "N/A"}
            </Text>
            <Text style={{ color: (index % 2) ? "#fff" : "#ff4655", width: 60, textAlign: 'center' }}>
              {post.active ? "Oui" : "Non"}
            </Text>
          </Pressable>
        ))
      ) : (
        <Text style={styles.loading}>Il n'y a pas de publication</Text>
      )}
    </ScrollView>
    {deleteModalVisible && (
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', zIndex: 100
      }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '80%', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>
            Êtes-vous sûr de vouloir supprimer{selectedPost?.title ? ` "${selectedPost.title}"` : ''} ?
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

export default DeletePost;