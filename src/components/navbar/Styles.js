import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    navbar: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        backgroundColor: '#7BBDE8',
        
        height: 60
    },

    nickname: {
        // fontFamily: 'Lemonada-Regular',
        color: '#fff',
        marginVertical: 20,
        marginLeft:10,
        fontSize: 20,
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: 
        {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 20,
    },
})