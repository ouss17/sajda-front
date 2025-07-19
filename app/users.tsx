import DeleteUser from '@/components/DeleteUser';
import ListUsers from '@/components/ListUsers';
import UserModal from '@/components/UserModal';
import Constants from "expo-constants";
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Back } from '../assets/Svg/Svg';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [role, setRole] = useState('');
  const [saving, setSaving] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<'list' | 'add' | 'delete'>('list');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const response = await res.json();
      setUsers(response.data || []);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserPress = (user: any) => {
    setSelectedUser(user);
    setRole(user.role);
    setModalVisible(true);
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
  };

  const handleSaveRole = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      await fetch(`${API_URL}/users/updateRole/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
        credentials: 'include',
      });
      setUsers(users =>
        users.map(u => u.id === selectedUser.id ? { ...u, role } : u)
      );
      setModalVisible(false);
    } catch (err) {
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      await fetch(`${API_URL}/users/delete/${selectedUser.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      setUsers(users => users.filter(u => u.id !== selectedUser.id));
      setDeleteModalVisible(false);
      setSelectedUser(null);
    } catch (err) {
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Pressable style={styles.buttonBack} onPress={() => router.back()}>
        <Back rotate={'0deg'} fill={'#fff'} />
      </Pressable>
      <Text style={styles.mainTitle}>Utilisateurs</Text>
      <View style={styles.menuContainer}>
        <Pressable onPress={() => setCurrentMenu('list')}>
          <Text style={{
            paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, marginHorizontal: 5, fontWeight: 'bold', fontSize: 16,
            backgroundColor: currentMenu === 'list' ? "#04bf94" : 'rgba(4, 191, 148, 0.1)',
            color: currentMenu === 'list' ? "#fff" : "#04bf94"
          }}>Liste</Text>
        </Pressable>
        <Pressable onPress={() => setCurrentMenu('delete')}>
          <Text style={{
            paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, marginHorizontal: 5, fontWeight: 'bold', fontSize: 16,
            backgroundColor: currentMenu === 'delete' ? "#ff4655" : 'rgba(255, 70, 85, 0.1)',
            color: currentMenu === 'delete' ? "#fff" : "#ff4655"
          }}>Supprimer</Text>
        </Pressable>
      </View>
      <View style={[styles.containerForm, { minHeight: 400 }]}>
        {currentMenu === 'list' && (
          <ListUsers
            users={users}
            loading={loading}
            onUserPress={handleUserPress}
            styles={styles}
          />
        )}
        {currentMenu === 'delete' && (
          <DeleteUser
            users={users}
            loading={loading}
            styles={styles}
            onAskDelete={(user: any) => { setSelectedUser(user); setDeleteModalVisible(true); }}
            selectedUser={selectedUser}
            deleteModalVisible={deleteModalVisible}
            setDeleteModalVisible={setDeleteModalVisible}
            handleDelete={handleDelete}
          />
        )}
      </View>
      <UserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        user={selectedUser}
        role={role}
        onRoleChange={handleRoleChange}
        onSave={handleSaveRole}
        loading={saving}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  mainTitle: {
    textAlign: "center",
    padding: 30,
    paddingBottom: 45,
    marginBottom: 30,
    color: "white",
    fontSize: 28,
    backgroundColor: "#04bf94",
    fontWeight: "bold",
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  containerForm: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginHorizontal: 30,
    marginBottom: 120,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minHeight: 400,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  actuTitle: {
    width: 90,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 0,
    paddingVertical: 2,
  },
  titleForm: {
    color: "#333",
    fontWeight: 'bold',
    fontSize: 15,
    width: 90,
    textAlign: 'center',
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    top: 55,
    paddingLeft: 10,
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
});

export default Users;
