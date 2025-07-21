import Constants from "expo-constants";
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Back } from '../assets/Svg/Svg';
import CreatePost from '../components/CreatePost';
import DeletePost from '../components/DeletePost';
import ListPosts from '../components/ListPosts';
import { useSelector } from "react-redux";
import { useRedirectIfRoleNotAllowed } from "@/hooks/useRedirectIfRoleNotAllowed";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [currentMenu, setCurrentMenu] = useState<'list' | 'add' | 'delete'>('list');

      const user = useSelector((state: any) => state.user.value);
useRedirectIfRoleNotAllowed(user, ["admin", "gerant", "dev"]);

  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts/mosquee/1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const response = await res.json();
      setPosts(response.data || []);
    } catch (err) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch categories au montage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const response = await res.json();
        setCategories(response.data || []);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handlePostPress = (post: any) => {
    setSelectedPost(post);
    setTitle(post.title || '');
    setContent(post.content || '');
    setMedia(post.media || '');
    setSelectedCategory(post.id_category);
    setActive(!!post.active);
    setModalVisible(true);
  };

  const handleCategoryChange = (id: number) => setSelectedCategory(id);
  const handleActiveChange = (value: boolean) => setActive(value);

  const handleSave = async () => {
    if (!selectedPost) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/posts/update/${selectedPost.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          id_category: selectedCategory,
          active,
          id_mosquee: 1,
        }),
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        setPosts(posts =>
          posts.map(p =>
            p.id === selectedPost.id
              ? { ...p, title, content, id_category: selectedCategory, active }
              : p
          )
        );
        setToastType('success');
        setToastMsg('Modification enregistrée !');
        setModalVisible(false);
      } else {
        setToastType('error');
        setToastMsg('Erreur lors de la modification');
        
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Erreur réseau');
    } finally {
      setSaving(false);
      setTimeout(() => setToastMsg(''), 4000);
    }
  };

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          media,
          id_category: selectedCategory,
          active,
          id_mosquee: 1,
        }),
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        setToastType('success');
        setToastMsg('Publication ajoutée !');
        fetchPosts();
        setAddModalVisible(false);
        setCurrentMenu('list');
        // await sendNotif(); 
      } else {
        setToastType('error');
        setToastMsg('Erreur lors de l\'ajout');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Erreur réseau');
    } finally {
      setSaving(false);
      setTimeout(() => setToastMsg(''), 4000);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/posts/delete/${selectedPost.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        setPosts(posts => posts.filter(p => p.id !== selectedPost.id));
        setToastType('success');
        setToastMsg('Publication supprimée !');
        setModalVisible(false);
      } else {
        setToastType('error');
        setToastMsg('Erreur lors de la suppression');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Erreur réseau');
    } finally {
      setSaving(false);
      setDeleteModalVisible(false);
      setTimeout(() => setToastMsg(''), 4000);
    }
  };

  useEffect(() => {
    if (currentMenu === 'add') {
      setTitle('');
      setContent('');
      setMedia('');
      setSelectedCategory(categories[0]?.id || 1);
      setActive(true);
      setAddModalVisible(true);
    } else {
      setAddModalVisible(false);
    }
  }, [currentMenu, categories]);

  const handleAskDelete = () => setDeleteModalVisible(true);

  // const sendNotif = async () => {
  //   try {
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: 'Basic ODUzMTcxZGUtMTc4Zi00NGU4LThiN2UtNTVjYjE1Y2RhNDRl', // remplace par ta clé REST OneSignal
  //       },
  //       body: JSON.stringify({
  //         app_id: 'aaff5f36-71db-4333-9b65-3c44458bc10f',
  //         included_segments: ['Subscribed Users'],
  //         template_id: '02711f37-17b2-44ce-aa43-5b8dbffa7bcc',
  //         // contents: { en: 'Nouvelle publication', fr: 'Une nouvelle publication a été ajoutée.' },
  //       }),
  //     };
  //     await fetch('https://onesignal.com/api/v1/notifications', options);
  //   } catch (err) {
  //     console.error('Erreur lors de l\'envoi de la notification OneSignal', err);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Pressable style={{ position: 'absolute', zIndex: 99, top:55, paddingLeft: 10 }} onPress={() => router.back()}>
        <Back rotate={'0deg'} fill={'#fff'} />
      </Pressable>
      <Text style={styles.mainTitle}>Publications</Text>
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
      {currentMenu === 'list' && (
        <ListPosts
          posts={posts}
          loading={loading}
          onPostPress={handlePostPress}
          styles={styles}
        />
      )}
      {modalVisible && (
        <CreatePost
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          active={active}
          setActive={setActive}
          onSave={handleSave}
          loading={saving}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          media={media}
          setMedia={setMedia}
        />
      )}
      {addModalVisible && (
        <CreatePost
          visible={addModalVisible}
          onClose={() => setAddModalVisible(false)}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          active={active}
          setActive={setActive}
          onSave={handleAdd}
          loading={saving}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          media={media}
          setMedia={setMedia}
        />
      )}
      {currentMenu === 'delete' && (
        <DeletePost
          posts={posts}
          loading={loading}
          styles={styles}
          onAskDelete={(post: any) => { setSelectedPost(post); setDeleteModalVisible(true); }}
          selectedPost={selectedPost}
          deleteModalVisible={deleteModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          handleDelete={handleDelete}
        />
      )}
      {toastMsg !== '' && (
        <Text
          style={{
            color: toastType === 'success' ? '#04bf94' : '#ff4655',
            backgroundColor: toastType === 'success' ? '#e5f9f4' : '#ffecee',
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
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
          }}
        >
          {toastMsg}
        </Text>
      )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: "center",
    padding: 32,
    backgroundColor: "#04bf94",
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 2,
    borderRadius: 16,
    marginBottom: 120,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
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
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: "#333",
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Posts;
