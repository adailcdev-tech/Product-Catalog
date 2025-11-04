import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const API_BASE = 'https://proweb.leoproti.com.br'

export default function Home(){
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

  if(loading) return <Container className="pt-5">Carregando...</Container>

  return (
    <Container className="pt-4">
      <h1>Produtos</h1>
      <Row>
        {produtos.map(p=> (
          <Col key={p.id} sm={6} md={4} lg={3} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{p.nome}</Card.Title>
                <Card.Text>R$ {p.preco}</Card.Text>
                <Link to={`/produto/${p.id}`} className="btn btn-primary">Ver detalhes</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
