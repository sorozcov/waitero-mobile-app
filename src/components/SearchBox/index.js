import React from 'react';
import { TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';

// componente de input para la búsqueda de libros, autores y editoriales
const SearchBox = props => {
	const { input, meta, handlePress, ...inputProps } = props;
	
	return (
		<View style={styles.inputContainer}>
			<AntDesign style={styles.searchIcon} name="search1" size={20} color={'#00171F'}/>
			<TextInput
				{...inputProps}
				selectionColor={'#428AF8'}
				placeholderTextColor={'#BEBEBE'}
				autoCapitalize={'none'}
				autoCorrect={false}
				onChangeText={input.onChange}
				onBlur={input.onBlur}
				onFocus={input.onFocus}
				value={input.value}
				style={styles.input}
			/>
			{
				meta.dirty
				? 
					<AntDesign style={styles.clearIcon} name="closecircleo" size={20} color={'#F55E64'} onPress={() => handlePress()}/>
				:
					null
			}
		</View>
	);
}
	
	
export default SearchBox;