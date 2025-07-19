import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CategoryList from '../../components/CategoryList';
import CategoryContentList from '../../components/CategoryContentList';
import CategoryContentDetail from '../../components/CategoryContentDetail';
import Constants from "expo-constants";
import { Category } from '../../types';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const Categories = () => {
  const [step, setStep] = useState<'list' | 'category' | 'content'>('list');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [contents, setContents] = useState([]);
  type Content = { id: number; title: string; [key: string]: any };
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setStep('list');
      setSelectedCategory(null);
      setContents([]);
      setSelectedContent(null);
    }, [])
  );

  useEffect(() => {
    if (step === 'list') {
      const fetchCategories = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${API_URL}/categories`);
          const data = await res.json();
          setCategories(data.data || []);
        } catch (e) {} finally { setLoading(false); }
      };
      fetchCategories();
    }
  }, [step]);

  useEffect(() => {
    if (step === 'category' && selectedCategory) {
      const fetchContents = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${API_URL}/posts/category/1/${selectedCategory.id}`);
          const data = await res.json();
          setContents(data.data || []);
        } catch (e) {} finally { setLoading(false); }
      };
      fetchContents();
    }
  }, [step, selectedCategory]);

  useEffect(() => {
    if (step === 'content' && selectedContent) {
      const fetchContentDetail = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${API_URL}/posts/${selectedContent.id}`);
          const data = await res.json();
          setSelectedContent(data.datas || selectedContent);
        } catch (e) {} finally { setLoading(false); }
      };
      fetchContentDetail();
    }
  }, [step, selectedContent]);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../assets/ressources/pages/template.png')}
      resizeMode="cover"
    >
      {step === 'list' && (
        <>
          <Text style={styles.mainTitle}>Médias</Text>
          <CategoryList
            categories={categories}
            loading={loading}
            onSelect={category => {
              setSelectedCategory(category);
              setStep('category');
            }}
          />
        </>
      )}

      {step === 'category' && selectedCategory && (
        <>
          <Pressable style={styles.buttonBack} onPress={() => setStep('list')}>
            <Text style={styles.buttonBackText}>Retour</Text>
          </Pressable>
          <Text style={styles.mainTitle}>{selectedCategory.name}</Text>
          <CategoryContentList
            contents={contents}
            loading={loading}
            onSelect={content => {
              setSelectedContent(content);
              setStep('content');
            }}
            onBack={() => setStep('list')}
            categoryName={selectedCategory?.name}
          />
        </>
      )}

      {step === 'content' && selectedContent && (
        <>
          <Pressable style={styles.buttonBack} onPress={() => setStep('category')}>
            <Text style={styles.buttonBackText}>Retour</Text>
          </Pressable>
          <Text style={styles.mainTitle}>{selectedContent.title}</Text>
          <CategoryContentDetail
            content={{
              id: selectedContent?.id ?? 0,
              title: selectedContent?.title ?? '',
              content: selectedContent?.content ?? '',
              media: selectedContent?.media ?? null
            }}
            loading={loading}
            categoryName={selectedCategory?.name}
            onBack={() => setStep('category')}
          />
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: "center",
    padding: 32,
    marginBottom: 20,
    color: "white",
    fontSize: 28,
    backgroundColor: "#04bf94",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    paddingVertical: 36,
    paddingLeft: 10,
    top: 0,
    left: 0,
  },
  buttonBackText: {
    color: "#04bf94",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Categories;
