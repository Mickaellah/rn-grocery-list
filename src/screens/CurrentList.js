import React, {useState, useEffect} from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator, SectionList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {v4 as uuid } from 'uuid';

import nachos from '../data/nachos'

import ListItem, {Separator, SectionHeader} from '../components/ListItem';
import AddItem from '../components/AddItem';
import { useCurrentList } from '../util/ListManager';


export default ({navigation}) => {

    const {list, loading, addItem, removeItem, cart, addToCart, favorite, addToFavorite} = useCurrentList();

    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    console.log("cart", cart);
    // console.log('favorite', favorite);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
            >
                <SectionList
                    sections={[
                        {title: 'List', data: list},
                        {title: 'Cart', data: cart},
                    ]}
                    renderSectionHeader={({section}) => (
                        <SectionHeader title={section.title} />
                    )}
                    renderItem={({item, index})=> (
                        <ListItem 
                            name={item.name}
                            onFavoritePress={() => addToFavorite(item)}
                            isFavorite={index < 2}
                            onAddedSwipe={() => addToCart(item)}
                            onDeleteSwipe={() => removeItem(item.id)}
                            onRowPress={() => navigation.navigate('ItemDetails', {
                                item
                            })}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                    ListHeaderComponent={() => (
                        <AddItem 
                            onSubmitEditing={({nativeEvent: {text}}) => addItem(text)}
                        />
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};