import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

interface User {
  id: number;
  pseudo?: string;
  name?: string;
  role: string;
}

interface ListUsersProps {
  users: User[];
  loading: boolean;
  onUserPress: (user: User) => void;
  styles: any;
}

const ListUsers = ({ users, loading, onUserPress, styles }: ListUsersProps) => (
  <ScrollView>
    <View style={styles.list}>
      <Text style={styles.titleForm}>Pseudo</Text>
      <Text style={styles.titleForm}>Rôle</Text>
    </View>
    {loading ? (
      <Text style={styles.loading}>Chargement...</Text>
    ) : users.length > 0 ? (
      users.map((user, index) => (
        <Pressable
          key={user.id || index}
          style={[
            styles.items,
            { backgroundColor: (index % 2) ? '#04bf94' : "rgba(4, 191, 148, 0.1)" }
          ]}
          onPress={() => onUserPress(user)}
        >
          <Text style={[
            styles.actuTitle,
            { color: (index % 2) ? "#fff" : "#04bf94" }
          ]}>
            {user.pseudo || user.name || 'N/A'}
          </Text>
          <Text style={[
            styles.actuTitle,
            { color: (index % 2) ? "#fff" : "#04bf94" }
          ]}>
            {user.role || 'N/A'}
          </Text>
        </Pressable>
      ))
    ) : (
      <Text style={styles.loading}>Il n'y a pas d'utilisateurs</Text>
    )}
  </ScrollView>
);

export default ListUsers;