import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'

const API_BASE = 'https://proweb.leoproti.com.br'

export default function ProductDetails(){
  const { id } = useParams()
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

  if(loading) return <Container className="pt-5">Carregando...</Container>
  if(!produto) return <Container className="pt-5">Produto não encontrado</Container>

  return (
    <Container className="pt-4">
      <Link to="/">&larr; Voltar</Link>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{produto.nome}</Card.Title>
          <Card.Text>{produto.descricao}</Card.Text>
          <Card.Text>R$ {produto.preco}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}
