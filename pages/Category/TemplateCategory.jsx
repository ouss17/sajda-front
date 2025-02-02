import { View, Text } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import GetCategories from './GetCategories'
import GetContentByCategory from './GetContentByCategory'
import GetContent from './GetContent'
import MemoryClickMediaContext from '../../context/MemoryClickMediaContext';

const TemplateCategory = () => {
    const { memoryClickMedia, setMemoryClickMedia } = useContext(MemoryClickMediaContext);

    const handleMemoryClick = (page) => {
        // console.log(page);
        setMemoryClickMedia(page);
    }
    const [category, setCategory] = useState(null);
    const [content, setContent] = useState(null);

    return (
        <>
            {
                memoryClickMedia == 'medias' ?
                    <GetCategories handleMemoryClick={handleMemoryClick} setCategory={setCategory} />
                    : memoryClickMedia == 'mediaDetail' ?
                        <GetContentByCategory handleMemoryClick={handleMemoryClick} category={category} setContent={setContent} />
                        : memoryClickMedia == 'mediaDetailContent' &&
                        <GetContent handleMemoryClick={handleMemoryClick} category={category} content={content} setContent={setContent} />
                //   <Actus handleMemoryClick={handleMemoryClick} />
            }
        </>
    )
}

export default TemplateCategory