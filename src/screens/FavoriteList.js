import React, {useState, useEffect} from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator, SectionList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {v4 as uuid } from 'uuid';

import nachos from '../data/nachos'

import ListItem, {Separator, SectionHeader} from '../components/ListItem';
// import AddItem from '../components/AddItem';
import { useCurrentList } from '../util/ListManager';


export default ({navigation}) => {

    const {favorited, removeItem} = useCurrentList();

    console.log(favorited);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
            >
                <SectionList
                    sections={[
                        {title: 'isFavorite', data: favorited},
                    ]}
                    renderSectionHeader={({section}) => (
                        <SectionHeader title={section.title} />
                    )}
                    renderItem={({item, index})=> (
                        <ListItem 
                            name={item.name}
                            // onFavoritePress={() => addToFavorite(item)}
                            isFavorite={index < 2}
                            // onAddedSwipe={() => addToCart(item)}
                            // onDeleteSwipe={() => removeItem(item.id)}
                            onRowPress={() => removeItem(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                    // ListHeaderComponent={() => (
                    //     <AddItem 
                    //         onSubmitEditing={({nativeEvent: {text}}) => addItem(text)}
                    //     />
                    // )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};