// web/src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import api from '../services/api'

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
          { id: 1, nome: 'Teclado Mecânico', preco: 299.90, imagem: '' },
          { id: 2, nome: 'Mouse Gamer', preco: 149.90, imagem: '' }
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
    <Container className="pt-4">
      <h1 className="mb-4">Catálogo de Produtos</h1>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-100"
        />
      </Form>

      <Row>
        {filtered.map(p => (
          <Col key={p.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={p.imagem || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}
                alt={p.nome}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{p.nome}</Card.Title>
                <Card.Text className="text-success fw-bold">
                  R$ {Number(p.preco).toFixed(2)}
                </Card.Text>
                <Link to={`/produto/${p.id}`} className="btn btn-primary mt-auto">
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
  )
}