// web/src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap'
import api from '../services/api'

export default function ProductDetails() {
  const { id } = useParams()
  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetch() {
      try {
        console.log(`Buscando produto ID: ${id}`)
        const res = await api.get(`/produto/${id}`)  // <--- CORRIGIDO AQUI
        setProduto(res.data)
        setError(null)
      } catch (err) {
        console.error('Erro:', err)
        setError('Produto não encontrado ou erro na API')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) {
    return (
      <Container className="pt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando produto...</p>
      </Container>
    )
  }

  if (error || !produto) {
    return (
      <Container className="pt-5">
        <Alert variant="danger">
          {error || 'Produto não encontrado'}
        </Alert>
        <Link to="/" className="btn btn-secondary">Voltar à lista</Link>
      </Container>
    )
  }

  return (
    <Container className="pt-4">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        ← Voltar à lista
      </Link>

      <Card className="shadow-lg">
        <Card.Img
          variant="top"
          src={produto.imagem || 'https://via.placeholder.com/600x400?text=Sem+Imagem'}
          alt={produto.nome}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Card.Body className="p-5">
          <Card.Title className="display-5 fw-bold text-primary">
            {produto.nome}
          </Card.Title>
          
          <div className="my-4">
            <span className="display-4 text-success fw-bold">
              R$ {Number(produto.preco).toFixed(2)}
            </span>
          </div>

          <Card.Text className="lead text-muted">
            {produto.descricao || 'Sem descrição disponível.'}
          </Card.Text>

          <div className="mt-4">
            <Button variant="success" size="lg">
              Adicionar ao Carrinho
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}