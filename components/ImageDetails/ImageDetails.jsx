import { Chip } from "@rneui/base";
import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { useSelector } from "react-redux";
import useOrientation from "../Orientation/useOrientation";

const placeholder = require('../../assets/placeholder.png');
const avatar = require('../../assets/user.png');
const tagsImg = require('../../assets/tag.png');
const dimensions = require('../../assets/dimensions.png');

export default function ImageDetails () {
    
    const image = useSelector(state => state.image);
    const orientation = useOrientation();
    const [isLandscape, setIsLandscape]= useState(orientation==='LANDSCAPE');

    useEffect(()=>{
        setIsLandscape(orientation==="LANDSCAPE");
    },[orientation]);

    const createTags = (tags) => (
        <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 16 }}>
            {
                tags.split(',').map(tag => <View key={tag} style={{marginRight: 8}}><Chip disabled title={tag.toUpperCase()} /></View> )
            }
        </View>
    );

    return (
        <View style={{ flex:1 }}>
            {!isLandscape && <View style={{
                        flex: 1,
                        flexDirection: isLandscape ? "row" : "column",
                    }}>
                <Image 
                    style={{
                        // flex:1,
                        maxHeight: 200,
                        margin: 24, 
                        height: image?.webformatHeight
                    }}
                    source={{
                        uri: image?.webformatURL,
                    }}/>
                    <View style={{ marginLeft: 24, marginRight: 24 }}>
                        <View style={{flexDirection:'row'}}>    
                            <Image source={avatar} style={{width: 24, height: 24, marginRight: 8}} />
                            <Text style={{
                                fontWeight: 'bold'
                            }}>{image?.user.toUpperCase()}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 24}}>    
                            <Image source={tagsImg} style={{width: 24, height: 24, marginRight: 8}} />
                            <Text style={{fontSize:12, fontWeight: 'bold'}}>
                                Image Tags</Text>
                        </View>
                        {createTags(image?.tags )}
                        <View style={{flexDirection:'row'}}>
                                <Image source={dimensions} style={{width: 24, height: 24, marginRight: 16}} />
                                <Text style={{fontSize: 14, fontWeight: 'bold'}}>Dimensions</Text>
                        </View>
                        <Text style={{ marginTop: 12 }}>Preview Size - {image?.previewWidth}px x {image?.previewHeight}px
                        {'\n'}Web Size - {image?.webformatWidth}px x {image?.webformatHeight}px
                        {'\n'}Full Size - {image?.imageWidth}px x {image?.imageHeight}px</Text>
                </View>
            </View>}
            {isLandscape && 
                <View style={{
                        margin: 24,
                        flex: 1,
                        flexDirection: isLandscape ? "row" : "column",
                    }}>
                <Image 
                    style={{
                        // flex:1,
                        width: image?.webformatWidth,
                        maxWidth: 400,
                        maxHeight: 200,
                        marginRight: 24, 
                        height: image?.webformatHeight
                    }}
                    source={{
                        uri: image?.webformatURL,
                    }}/>
                    <View style={{ marginLeft: 24, marginRight: 24, flex: 1 }}>
                        <View style={{flexDirection:'row'}}>    
                            <Image source={avatar} style={{width: 24, height: 24, marginRight: 8}} />
                            <Text style={{
                                fontWeight: 'bold'
                            }}>{image?.user.toUpperCase()}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 24}}>    
                            <Image source={tagsImg} style={{width: 24, height: 24, marginRight: 8}} />
                            <Text style={{fontSize:12, fontWeight: 'bold'}}>
                                Image Tags</Text>
                        </View>
                        {createTags(image?.tags )}
                        <View style={{flexDirection:'row'}}>
                                <Image source={dimensions} style={{width: 24, height: 24, marginRight: 8}} />
                                <Text style={{fontSize: 14, fontWeight: 'bold'}}>Dimensions</Text>
                        </View>
                        <Text style={{ marginTop: 12 }}>Preview Size - {image?.previewWidth}px x {image?.previewHeight}px
                        {'\n'}Web Size - {image?.webformatWidth}px x {image?.webformatHeight}px
                        {'\n'}Full Size - {image?.imageWidth}px x {image?.imageHeight}px</Text>
                    </View>
            </View>}
        </View>
    );
};