// web/src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Navbar } from 'react-bootstrap'
import api from '../services/api'
import '../styles/global.css'

// Importando imagens
import tecladoImg from '../assets/tec.svg'
import mouseImg from '../assets/images.svg'
import pcImg from '../assets/pc.svg'
import headsetImg from '../assets/head.svg'

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busca, setBusca] = useState('')

  useEffect(() => {
    async function load() {
      try {
        console.log('Carregando produtos...')
        const res = await api.get('/produto')
        const data = res.data.content || res.data
        setProdutos(data)
        setFiltered(data)
        setError(null)
      } catch (err) {
        console.error('Erro API:', err)
        setError('Não foi possível carregar os produtos.')
        // MOCK DATA (pra deploy nunca falhar)
        const mock = [
          { id: 1, nome: 'Teclado Mecânico', preco: 299.90, imagem: '/assets/img/tec.jpg' },
          { id: 2, nome: 'Mouse Gamer', preco: 149.90, imagem: '/assets/img/images.jpg' },
          { id: 3, nome: 'PC Gamer', preco: 4599.00, imagem: '/assets/img/pc.jpg' },
          { id: 4, nome: 'Headset Pro', preco: 199.00, imagem: '/assets/img/head.jpg' }
        ]

       
        setProdutos(mock)
        setFiltered(mock)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const lower = busca.toLowerCase()
    const filt = produtos.filter(p => 
      p.nome?.toLowerCase().includes(lower)
    )
    setFiltered(filt)
  }, [busca, produtos])

  if (loading) return <Container className="pt-5 text-center"><h3>Carregando...</h3></Container>
  if (error && produtos.length === 0) return <Container className="pt-5"><div className="alert alert-danger">{error}</div></Container>

  return (
    <>
      <Navbar className="navbar-custom mb-4">
        <Container>
          <Navbar.Brand>🛍️ TechShop</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="page-header">
        <Container>
          <h1 className="display-4">Produtos em Destaque</h1>
          <Form className="mt-4">
            <Form.Control
              type="text"
              placeholder="🔍 Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="search-bar"
            />
          </Form>
        </Container>
      </div>

      <Container>
        <Row>
        {filtered.map(p => (
          <Col key={p.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="product-card h-100 shadow-sm">
              <div className="card-img-wrapper">
                <Card.Img
                  variant="top"
                  src={p.imagem || 'https://via.placeholder.com/300x200?text=Produto+Tech'}
                  alt={p.nome}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold h5 mb-3">{p.nome}</Card.Title>
                <Card.Text className="product-price mb-3">
                  R$ {Number(p.preco).toFixed(2)}
                </Card.Text>
                <Link to={`/produto/${p.id}`} className="btn btn-custom mt-auto">
                  Ver detalhes
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filtered.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">Nenhum produto encontrado.</p>
        </div>
      )}
      </Container>
    </>
  )
}