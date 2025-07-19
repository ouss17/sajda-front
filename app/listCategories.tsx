import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import CategoryModal from '../components/CategoryModal';
import CreateCategory from '../components/CreateCategory';
import DeleteCategory from '../components/DeleteCategory';
import { useRouter } from 'expo-router';
import { Back } from '../assets/Svg/Svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

interface Category {
  id: number;
  name: string;
  comment: string;
  url_name: string;
}

const ListCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [urlName, setUrlName] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [currentMenu, setCurrentMenu] = useState<'list' | 'add' | 'delete'>('list');
  const router = useRouter();


  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      
      setCategories(data.data || []);
    } catch (err) {
      setToastType('error');
      setToastMsg('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleCategoryPress = (cat : any) => {
    setSelectedCategory(cat);
    setName(cat.name || '');
    setComment(cat.comment || '');
    setUrlName(cat.url_name || '');
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!selectedCategory) return;
    try {
      const generatedUrlName = name.trim().replace(/\s+/g, '_');
      const res = await fetch(`${API_URL}/categories/update/${selectedCategory.url_name}`, {
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comment, urlName: generatedUrlName }),
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        setToastType('success');
        setToastMsg('Catégorie modifiée !');
        fetchCategories();
        setModalVisible(false);
      } else {
        setToastType('error');
        setToastMsg('Erreur lors de la modification');
        console.log(response.error);
        
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Erreur réseau');
    } finally {
      setTimeout(() => setToastMsg(''), 4000);
    }
  };

  const handleAdd = async () => {
    try {
      const generatedUrlName = name.trim().replace(/\s+/g, '_');
      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comment, urlName: generatedUrlName }),
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        setToastType('success');
        setToastMsg('Catégorie ajoutée !');
        fetchCategories();
        setAddModalVisible(false);
        setCurrentMenu('list');
      } else {
        setToastType('error');
        setToastMsg('Erreur lors de l\'ajout');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Erreur réseau');
    } finally {
      setTimeout(() => setToastMsg(''), 4000);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      const res = await fetch(`${API_URL}/categories/delete/${selectedCategory.url_name}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        setCategories(categories => categories.filter(c => c.id !== selectedCategory.id));
        setToastType('success');
        setToastMsg('Catégorie supprimée !');
        setDeleteModalVisible(false);
        setSelectedCategory(null);
      } else {
        setToastType('error');
        setToastMsg('Erreur lors de la suppression');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Erreur réseau');
    } finally {
      setTimeout(() => setToastMsg(''), 4000);
    }
  };

  useEffect(() => {
    if (currentMenu === 'add') {
      setName('');
      setComment('');
      setUrlName('');
      setAddModalVisible(true);
    } else {
      setAddModalVisible(false);
    }
  }, [currentMenu]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Pressable style={{ position: 'absolute', zIndex: 99, top: 55, paddingLeft: 10 }} onPress={() => router.back()}>
        <Back rotate={'0deg'} fill={'#fff'} />
      </Pressable>
      <Text style={styles.mainTitle}>Catégories</Text>
      {/* Menu */}
      <View style={styles.menu}>
        <Pressable onPress={() => setCurrentMenu('list')}>
          <Text style={[
            styles.menuItem,
            { backgroundColor: currentMenu === 'list' ? "#04bf94" : 'rgba(4, 191, 148, 0.1)', color: currentMenu === 'list' ? "#fff" : "#04bf94" }
          ]}>Liste</Text>
        </Pressable>
        <Pressable onPress={() => setCurrentMenu('add')}>
          <Text style={[
            styles.menuItem,
            { backgroundColor: currentMenu === 'add' ? "#04bf94" : 'rgba(4, 191, 148, 0.1)', color: currentMenu === 'add' ? "#fff" : "#04bf94" }
          ]}>Ajouter</Text>
        </Pressable>
        <Pressable onPress={() => setCurrentMenu('delete')}>
          <Text style={[
            styles.menuItem,
            { backgroundColor: currentMenu === 'delete' ? "#ff4655" : 'rgba(255, 70, 85, 0.1)', color: currentMenu === 'delete' ? "#fff" : "#ff4655" }
          ]}>Supprimer</Text>
        </Pressable>
      </View>

      {/* Liste */}
      {currentMenu === 'list' && (
        <ScrollView style={styles.containerForm}>
          <View style={styles.list}>
            <Text style={[styles.titleForm, styles.postTitle]}>Nom</Text>
            <Text style={styles.titleForm}>Description</Text>
          </View>
          {loading ? (
            <Text style={styles.loading}>Chargement...</Text>
          ) : categories.length > 0 ? (
            categories.map((cat, index) => (
              <Pressable
                key={cat.id || index}
                style={[
                  styles.items,
                  { backgroundColor: (index % 2) ? '#04bf94' : "rgba(4, 191, 148, 0.1)" }
                ]}
                onPress={() => handleCategoryPress(cat)}
              >
                <Text style={[styles.postTitle, { color: (index % 2) ? "#fff" : "#04bf94" }]}>
                  {cat.name || "N/A"}
                </Text>
                <Text style={{ color: (index % 2) ? "#fff" : "#04bf94", width: 120, textAlign: 'center' }}>
                  {cat.comment || "N/A"}
                </Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.loading}>Il n'y a pas de catégories</Text>
          )}
        </ScrollView>
      )}

      {/* Ajout */}
      <CreateCategory
        visible={addModalVisible}
        onClose={() => { setAddModalVisible(false); setCurrentMenu('list'); }}
        name={name}
        setName={setName}
        comment={comment}
        setComment={setComment}
        urlName={urlName}
        setUrlName={setUrlName}
        onSave={handleAdd}
        loading={loading}
      />

      {/* Détail / Modification */}
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        category={selectedCategory}
        name={name}
        setName={setName}
        comment={comment}
        setComment={setComment}
        urlName={urlName}
        setUrlName={setUrlName}
        onSave={handleSave}
        loading={loading}
      />

      {/* Suppression */}
      {currentMenu === 'delete' && (
        <DeleteCategory
          categories={categories}
          loading={loading}
          styles={styles}
          onAskDelete={(cat) => { setSelectedCategory(cat); setDeleteModalVisible(true); }}
          selectedCategory={selectedCategory}
          deleteModalVisible={deleteModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          handleDelete={handleDelete}
        />
      )}

      {/* Toast */}
      {toastMsg !== '' && (
        <Text style={{
          color: toastType === 'success' ? '#04bf94' : '#ff4655',
          backgroundColor: toastType === 'success' ? '#e5f9f4' : '#ffecee',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          margin: 15,
          padding: 15,
          borderRadius: 5,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 10,
        }}>
          {toastMsg}
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    overflow: 'hidden',
  },
  containerForm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
    marginHorizontal: 10
  },
  items: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  postTitle: {
    width: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleForm: {
    color: "#333",
    fontWeight: 'bold',
    fontSize: 16,
    width: 80,
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  mainTitle: {
    textAlign: "center",
    padding: 32,
    backgroundColor: "#04bf94",
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default ListCategories;