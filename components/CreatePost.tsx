import React from 'react';
import PostModal from './PostModal';

interface CreatePostProps {
  visible: boolean;
  onClose: () => void;
  categories: any[];
  selectedCategory: number;
  setSelectedCategory: (id: number) => void;
  active: boolean;
  setActive: (value: boolean) => void;
  onSave: () => void;
  loading: boolean;
  title: string;
  setTitle: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  media: string;
  setMedia: (v: string) => void;
}

const CreatePost = ({
  visible, onClose, categories, selectedCategory, setSelectedCategory,
  active, setActive, onSave, loading, title, setTitle, content, setContent, media, setMedia
}: CreatePostProps) => (
  <PostModal
    visible={visible}
    onClose={onClose}
    post={{
      title,
      content,
      id_category: selectedCategory,
      active,
      media,
      created_at: '',
      id: undefined,
    }}
    categories={categories}
    selectedCategory={selectedCategory}
    onCategoryChange={setSelectedCategory}
    active={active}
    onActiveChange={setActive}
    onSave={onSave}
    loading={loading}
    title={title}
    content={content}
    onTitleChange={setTitle}
    onContentChange={setContent}
    media={media}
    onMediaChange={setMedia}
  />
);

export default CreatePost;