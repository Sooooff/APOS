import React, { useEffect, useState } from 'react'
import './Dashboard.css'

const API_BASE_URL = 'http://localhost:8180/api'


export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: '',
  })
  const [editingId, setEditingId] = useState(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError('')
      const resp = await fetch(`${API_BASE_URL}/cliente/all`)
      if (!resp.ok) throw new Error('Error al obtener clientes')
      const data = await resp.json()
      setContacts(data)
      setFiltered(data)
    } catch (err) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    const q = search.toLowerCase().trim()
    if (!q) {
      setFiltered(contacts)
      return
    }
    setFiltered(
      contacts.filter((c) => {
        const text = [c.primerNombre, c.segundoNombre, c.primerApellido, c.segundoApellido, c.email].filter(Boolean).join(' ').toLowerCase()
        return text.includes(q)
      })
    )
  }, [search, contacts])

  const openAdd = () => {
    setEditingId(null)
    setFormData({ primerNombre: '', segundoNombre: '', primerApellido: '', segundoApellido: '', email: '' })
    setModalOpen(true)
  }

  const openEdit = (c) => {
    setEditingId(c.id)
    setFormData({
      primerNombre: c.primerNombre || '',
      segundoNombre: c.segundoNombre || '',
      primerApellido: c.primerApellido || '',
      segundoApellido: c.segundoApellido || '',
      email: c.email || '',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const url = editingId ? `${API_BASE_URL}/cliente/${editingId}` : `${API_BASE_URL}/cliente/create`
    const method = editingId ? 'PUT' : 'POST'
    try {
      setLoading(true)
      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!resp.ok) throw new Error('Error al guardar')
      closeModal()
      await fetchContacts()
    } catch (err) {
      setError(err.message || 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este cliente?')) return
    try {
      setLoading(true)
      setError('')
      const resp = await fetch(`${API_BASE_URL}/cliente/${id}`, { method: 'DELETE' })
      if (!resp.ok) throw new Error('Error al eliminar')
      setContacts((prev) => prev.filter((c) => c.id !== id))
      setFiltered((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      setError(err.message || 'Error al eliminar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contacts-page">
      <h1 className="contacts-title">Clientes</h1>

      {error && (
        <div className="contacts-error" role="alert">
          {error}
        </div>
      )}

      <div className="contacts-actions">
        <div className="contacts-search-wrap">
          <svg className="contacts-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="text"
            placeholder="Buscar clientes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="contacts-search-input"
          />
        </div>
        <button type="button" className="contacts-btn-filter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
          Filtrar
        </button>
        <button type="button" className="contacts-btn-primary" onClick={openAdd}>
          + Agregar cliente
        </button>
      </div>

      <div className="contacts-table-wrap">
        {loading && <div className="contacts-loading">Cargando…</div>}
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Primer nombre</th>
              <th>Segundo nombre</th>
              <th>Primer apellido</th>
              <th>Segundo apellido</th>
              <th>Email</th>
              <th className="contacts-table-actions-col" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="contacts-table-empty">No hay clientes.</td>
              </tr>
            )}
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.primerNombre || '—'}</td>
                <td>{c.segundoNombre || '—'}</td>
                <td>{c.primerApellido || '—'}</td>
                <td>{c.segundoApellido || '—'}</td>
                <td>{c.email || '—'}</td>
                <td className="contacts-table-actions-cell">
                  <div className="contacts-row-actions">
                    <button
                      type="button"
                      className="contacts-btn-action contacts-btn-action--view"
                      onClick={() => openEdit(c)}
                      title="Ver"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                    <button
                      type="button"
                      className="contacts-btn-action contacts-btn-action--edit"
                      onClick={() => openEdit(c)}
                      title="Editar"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                    <button
                      type="button"
                      className="contacts-btn-action contacts-btn-action--delete"
                      onClick={() => handleDelete(c.id)}
                      title="Eliminar"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="contacts-modal-backdrop" onClick={closeModal}>
          <div className="contacts-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="contacts-modal-title">{editingId ? 'Editar cliente' : 'Agregar cliente'}</h2>
            <form onSubmit={handleSubmit} className="contacts-form">
              <div className="contacts-form-row">
                <label>
                  <span>Primer nombre *</span>
                  <input type="text" name="primerNombre" value={formData.primerNombre} onChange={handleChange} required />
                </label>
                <label>
                  <span>Segundo nombre</span>
                  <input type="text" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} />
                </label>
              </div>
              <div className="contacts-form-row">
                <label>
                  <span>Primer apellido *</span>
                  <input type="text" name="primerApellido" value={formData.primerApellido} onChange={handleChange} required />
                </label>
                <label>
                  <span>Segundo apellido</span>
                  <input type="text" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} />
                </label>
              </div>
              <label className="contacts-form-full">
                <span>Email *</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <div className="contacts-form-actions">
                <button type="button" className="contacts-btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="contacts-btn-primary">{editingId ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
