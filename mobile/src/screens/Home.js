import React, {useEffect, useState} from 'react'
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import axios from 'axios'

const API_BASE = 'https://proweb.leoproti.com.br'

export default function Home({navigation}){
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function fetch(){
      try{
        const res = await axios.get(`${API_BASE}/api/produto`)
        setProdutos(res.data || [])
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }
    fetch()
  },[])

  if(loading) return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Carregando...</Text></View>

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{fontSize:22,marginBottom:12}}>Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={item=>String(item.id)}
        renderItem={({item})=> (
          <TouchableOpacity onPress={()=>navigation.navigate('ProductDetails',{id:item.id})} style={{padding:12,borderBottomWidth:1,borderColor:'#eee'}}>
            <Text style={{fontSize:16}}>{item.nome}</Text>
            <Text>R$ {item.preco}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
