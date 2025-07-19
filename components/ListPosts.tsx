import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  active: boolean;
}

interface ListPostsProps {
  posts: Post[];
  loading: boolean;
  onPostPress: (post: Post) => void;
  styles: any;
}

const ListPosts = ({ posts, loading, onPostPress, styles }: ListPostsProps) => (
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
            { backgroundColor: (index % 2) ? '#04bf94' : "rgba(4, 191, 148, 0.1)" }
          ]}
          onPress={() => onPostPress(post)}
        >
          <Text style={[styles.postTitle, { color: (index % 2) ? "#fff" : "#04bf94" }]}>
            {post.title || "N/A"}
          </Text>
          <Text style={{ color: (index % 2) ? "#fff" : "#04bf94", width: 120, textAlign: 'center' }}>
            {post.content ? post.content.substring(0, 10) + (post.content.length > 10 ? "..." : "") : "N/A"}
          </Text>
          <Text style={{ color: (index % 2) ? "#fff" : "#04bf94", width: 80, textAlign: 'center' }}>
            {post.created_at ? post.created_at.split('T')[0] : "N/A"}
          </Text>
          <Text style={{ color: (index % 2) ? "#fff" : "#04bf94", width: 60, textAlign: 'center' }}>
            {post.active ? "Oui" : "Non"}
          </Text>
        </Pressable>
      ))
    ) : (
      <Text style={styles.loading}>Il n'y a pas de publication</Text>
    )}
  </ScrollView>
);

export default ListPosts;