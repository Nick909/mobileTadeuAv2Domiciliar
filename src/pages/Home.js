import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    AsyncStorage, 
    StyleSheet,
    TouchableOpacity,
    Picker,
    
} from 'react-native'

import Api from '../services/Api'

import List from '../components/list'
import Navbar from '../components/navbar/'
import CreateItem from '../components/createItem'
import { TextInput, ScrollView } from 'react-native-gesture-handler'

//4e 69 63 68 6f 6c 61 73 

export default  Home = () => {
    const [email, setEmail ]            = useState('') 
    const [user_id, setUser_Id]         = useState('')
    const [startDate, setStartDate]     = useState('')
    const [endDate, setEndDate]         = useState('')
    const [genericTypeExpense, setGetyEx] = useState('')
    const [genericTypePaymenty, setGetyPy] = useState('')
    const [genericDtPayment, setDtPay] = useState('')

    const [listPayment, setListPayment] = useState([])
    //const [listPaymentType, setListPaymentType] = useState([])
    const [currentGabiState, setCurrentGabiState] = useState('')
    
    useEffect(() => {
       
        AsyncStorage.multiGet(['email', 'id']).then((user) => {
            const [email, id] = user
            if(email[1]) {
                setEmail(email[1])
            }
            if(id[1]) {
                setUser_Id(id[1])
            }
            refresh()
            setCurrentGabiState(1)
        })
    }, [])

    refresh = async () => {
        console.log(genericTypePaymenty)
        try{
            let response = await Api.get('/findPayment', {
                headers: {
                    user_id: user_id
                },
                params: {
                    startDate,
                    endDate,
                    payment_type: genericTypePaymenty,
                    expense_type: genericTypeExpense,
                    dt_payment: genericDtPayment,
                },
                
            })
           // console.log(response.data)
            setListPayment(response.data)
        }catch(error) {
            console.log(error)
        }
    }

    createIteminList = async item => {
       //let userId = toString(user_id)
        try{
           const res = await Api.post('/dashboadpayment', {
                "description"       : item.description,
                "dt_payment"        : item.dt_payment,
                "dt_expire"			: item.dt_expire,
                "value"				: item.value,
                "fine_amount"  	    : item.fine_amount,
                "interest_amount"	: item.interest_amount,
                "payment_type"		: item.payment_type ,
                "expense_type"		: item.expense_type,
                "user_id"           : item.user_id,
           })
            console.log(res.data,'fuction add()')
            refresh()
        } catch(error) {
            console.log(error)
        }
    }

    updateI = async item =>{
        console.log('atulaliza', item)
    }

    deleteItemList = async id => {
        //console.log(_id)
       try {
            const response = await Api.delete('/matapagamento', {params:{_id: id } })
            console.log(response)
            refresh()
        } catch (error) {
            console.log(error)
        }
    }

    
    gabi = () => {
        if(currentGabiState == 1){
            return(
                <>
                    <ScrollView>
                        <View style={[styles.spaceZone, { flexDirection: 'row',justifyContent: 'flex-start', }]}>
                            <ScrollView
                            horizontal
                            >
                            <TextInput
                                placeholder='data Inicial'
                                style={[styles.filter, styles.shadow]}
                                value={startDate}
                                onChangeText={setStartDate}
                            />
                            <TextInput
                                placeholder='data Final'
                                style={[styles.filter, styles.shadow]}
                                value={endDate}
                                onChangeText={setEndDate}
                            />
                            <Picker
                                selectedValue={genericTypeExpense}
                                style={[styles.filter, styles.shadow, {borderRadius: 100, width: 116}]}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGetyEx(itemValue)
                                }
                            >   
                                {/*<Picker.Item  label='choose' value={null} />*/}
                                <Picker.Item  label='choose' value='' />
                                <Picker.Item  label='Combustível' value='5dcd592fbe244469cdfbfbba' />
                                <Picker.Item  label='Telefone' value='5dcd5928be244469cdfbfbb9' />
                                <Picker.Item  label='Saúde' value='5dcd583abe244469cdfbfbb6' />    
                                <Picker.Item  label='Outros' value='5dcd5934be244469cdfbfbbb' />    

                                {/*typeExpense.forEach(type => <Picker.Item key={type} label={type.description} value={type.description} />)*/}
                                    
                            </Picker>
                            <Picker
                                selectedValue={genericTypePaymenty}
                                style={[ styles.filter, styles.shadow, {borderRadius: 100, width: 116}]}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGetyPy(itemValue)
                                }
                            >  
                                {/*<Picker.Item  label='choose' value={null} />*/}
                                <Picker.Item  label='choose' value='' />
                                <Picker.Item  label='Credito' value='5dcd550410cf97682b4e15c7' />
                                <Picker.Item  label='Debito' value='5dcd550a10cf97682b4e15c8' />
                                <Picker.Item  label='Dinheiro' value='5dcd551110cf97682b4e15c9' />    
                                <Picker.Item  label='Outros' value='5dd099bcd21b756ccf23d621' />    

                                {/*typeExpense.forEach(type => <Picker.Item key={type} label={type.description} value={type.description} />)*/}
                                
                            </Picker> 

                            <Picker
                                selectedValue={genericDtPayment}
                                style={[ styles.filter, styles.shadow, {borderRadius: 100, width: 116}]}
                                onValueChange={(itemValue, itemIndex) =>
                                    setDtPay(itemValue)
                                }
                            >  
                                {/*<Picker.Item  label='choose' value={null} />*/}
                                <Picker.Item  label='choose' value='' />
                                <Picker.Item  label='nullo' value='2' />
                                <Picker.Item  label='not nullo' value='1'/>
                                {/*typeExpense.forEach(type => <Picker.Item key={type} label={type.description} value={type.description} />)*/}
                                
                            </Picker> 
                            
                            <TouchableOpacity style={styles.buttonFilter} onPress={() => refresh( )}>
                                <Text style={styles.filterTextButton}>taca o dedo</Text>
                            </TouchableOpacity>
                            </ScrollView>
                        </View>
            
                        <List payments={listPayment} delete={deleteItemList}/>
                        {/*listPayment.map(payment => <List key={payment} payment={payment}/>)*/}
                        
                    </ScrollView>
                    <TouchableOpacity style={[styles.buttonfluter, styles.shadow]} onPress={() => setCurrentGabiState(2)}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </>
            )  
        }else if(currentGabiState == 2){
            return(
                <>  
                    <CreateItem add={createIteminList}/>
                    <TouchableOpacity style={[styles.buttonfluter, styles.shadow]} onPress={() => setCurrentGabiState(1)}>
                         <Text style={styles.buttonText}>@</Text>
                    </TouchableOpacity>
                </>
            )
        }
    }

    return (
        <View  style={styles.container}>
            <Navbar email={email} />
            {gabi()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#9F94FF',
    },

    spaceZone: {
        alignSelf: 'stretch',
        marginBottom: 4,
        marginHorizontal: 4,
        marginTop: 4
    },

    buttonfluter: {
        position: 'absolute',
        height: 74,
        width: 74,
        borderRadius: 100,
        marginTop: 550,
        marginEnd: 325 ,
        marginLeft: 320,
        backgroundColor:'#D57BE8',
        justifyContent: 'center',
       
    },

    buttonText: {
        fontSize: 60,
        textAlign: 'center',
        color: '#fff',
        textAlignVertical: 'center',
        marginBottom: 8,
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
        elevation: 18,
    },

    filter: {
        borderRadius: 100,
        backgroundColor: '#fff',
        marginHorizontal: 4,
        textAlign: 'center',
        width: 80
    },

    buttonFilter: {
        borderRadius: 100,
        backgroundColor: '#D57BE8',
        marginHorizontal: 4,
        textAlign: 'center',
        width: 80
    },

    filterTextButton: {
        fontSize: 10,
        textAlign: 'center',
        color: '#fff',
        textAlignVertical: 'center',
        marginBottom: 8,
    }


})