import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'

const API_BASE = 'https://proweb.leoproti.com.br'

export default function ProductDetails({route}){
  const { id } = route.params
  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function fetch(){
      try{
        const res = await axios.get(`${API_BASE}/api/produto/${id}`)
        setProduto(res.data)
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }
    fetch()
  },[id])

  if(loading) return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Carregando...</Text></View>
  if(!produto) return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Produto não encontrado</Text></View>

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{fontSize:20}}>{produto.nome}</Text>
      <Text style={{marginTop:8}}>{produto.descricao}</Text>
      <Text style={{marginTop:8}}>R$ {produto.preco}</Text>
    </View>
  )
}
