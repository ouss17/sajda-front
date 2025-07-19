import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

type User = {
  id?: string | number;
  pseudo?: string;
  name?: string;
  role?: string;
  [key: string]: any;
};

type DeleteUserProps = {
  users: User[];
  loading: boolean;
  styles: { [key: string]: any };
  onAskDelete: (user: User) => void;
  selectedUser?: User | null;
  deleteModalVisible: boolean;
  setDeleteModalVisible: (visible: boolean) => void;
  handleDelete: () => void;
};

const DeleteUser: React.FC<DeleteUserProps> = ({
  users, loading, styles, onAskDelete, selectedUser, deleteModalVisible, setDeleteModalVisible, handleDelete
}) => (
  <>
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
              { backgroundColor: (index % 2) ? '#ff4655' : "rgba(255, 70, 85, 0.08)" }
            ]}
            onPress={() => onAskDelete(user)}
          >
            <Text style={[
              styles.actuTitle,
              { color: (index % 2) ? "#fff" : "#ff4655" }
            ]}>
              {user.pseudo || user.name || 'N/A'}
            </Text>
            <Text style={[
              styles.actuTitle,
              { color: (index % 2) ? "#fff" : "#ff4655" }
            ]}>
              {user.role || 'N/A'}
            </Text>
          </Pressable>
        ))
      ) : (
        <Text style={styles.loading}>Il n'y a pas d'utilisateurs</Text>
      )}
    </ScrollView>
    {deleteModalVisible && (
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', zIndex: 100
      }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '80%', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>
            Êtes-vous sûr de vouloir supprimer{selectedUser?.pseudo ? ` "${selectedUser.pseudo}"` : ''} ?
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

export default DeleteUser;