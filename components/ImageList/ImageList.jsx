import React, { useEffect, useState } from 'react';
import { Image, View, Text, FlatList, Pressable } from "react-native";
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux'
import { IMAGE_CHANGE } from '../../redux/constants';
import useOrientation from '../Orientation/useOrientation';

export default function ImageList({ navigation }) {

    const [ images, setImages ] = useState([]);
    const [query, setQuery] = useState("");
    
    const [page, setPage] = useState(1);

    const orientation = useOrientation();
    const [ isLandscape, setIsLandscape ]= useState(orientation==='LANDSCAPE');

    useEffect(()=>{
        setIsLandscape(orientation==='LANDSCAPE');
    },[orientation]);

    const API_KEY = '3909886-a4b3466f9dc96a8cc1a1256c9';
    const dispatch = useDispatch();

    useEffect(()=>{ 
        fetchAllImages(query);
    },[]);

    const pressed = (item) => {
        dispatch({ type: IMAGE_CHANGE, payload: item });
        navigation.navigate('Details', { name: item.id } )
    };

    const renderItem = ({ item }) => (
        <Pressable
            onPress={()=>pressed(item)}>
                <View
                    style={{
                        flexDirection: 'column'
                    }}>
                    <Image
                        style={{
                            flex:1,
                            height: 200,
                            marginRight: 24,
                            marginLeft: 24,
                            marginBottom: 24,
                            borderRadius: 8,
                            borderColor: 'lightgray',
                            borderWidth: 1
                        }}
                        source={{
                            uri: item.previewURL,
                        }} />
                </View>
        </Pressable>
    );

    const renderItemHor = ({ item }) => (
        <Pressable
            onPress={()=>pressed(item)}>
                <View>
                    <Image
                        style={{
                            flex:1,
                            width: 400,
                            height: 200,
                            marginBottom: 24,
                            borderRadius: 8,
                            borderColor: 'lightgray',
                            borderWidth: 1
                        }}
                        source={{
                            uri: item.previewURL,
                        }} />
                </View>
        </Pressable>
    );

    const fetchMore = async () => {
        let url = `https://pixabay.com/api/?key=${API_KEY}` + (query.length>0?`&q=${query}&page=${page}`:`&page=${page}`) ;
        let response = await fetch(
            url, {
                method: 'GET'
            });
        let json = await response.json();
        setImages([...images, ...json.hits]);
        setPage(page+1);
    };

    const fetchAllImages = async (text) => {
        let url = `https://pixabay.com/api/?key=${API_KEY}` + (text.length>0?`&q=${text}&page=${page}`:`&page=${page}`) ;
        let response = await fetch(
            url, {
                method: 'GET'
            });
        let json = await response.json();
        setImages(json.hits);
        setPage(2);
        setQuery(text);
    };

    return (
        <View style={{ flex: 2, flexDirection: 'column' }}>
            <SearchBar style={{  }} onTextChange={fetchAllImages} />
            {!isLandscape&&<FlatList
                style={{
                    flex: 1
                }}
                data={images}
                renderItem={renderItem}
                onEndReached={fetchMore}
                ListEmptyComponent={<Text style={{textAlign: 'center'}}>No images found...</Text>}
                ListFooterComponent={<Text style={{textAlign: 'center'}}>End of list</Text>}
                keyExtractor={item=>item.id} />}
            {isLandscape&&
            <FlatList
                style={{
                    flex: 1,
                    marginLeft: 24,
                    marginRight: 24
                }}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={images}
                numColumns={2}
                renderItem={renderItemHor}
                onEndReached={fetchMore}
                ListEmptyComponent={<Text style={{textAlign: 'center'}}>No images found...</Text>}
                ListFooterComponent={<Text style={{textAlign: 'center'}}>End of list</Text>}
                keyExtractor={item=>item.id} />}
        </View>
    );
}