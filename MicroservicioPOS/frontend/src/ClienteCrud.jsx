import React, { useEffect, useState } from 'react'

const API_BASE_URL = 'http://localhost:8180/api'

function ClienteCrud() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: '',
  })

  const [editingId, setEditingId] = useState(null)

  const fetchClientes = async () => {
    try {
      setLoading(true)
      setError('')
      const resp = await fetch(`${API_BASE_URL}/cliente/all`)
      if (!resp.ok) {
        throw new Error('Error al obtener clientes')
      }
      const data = await resp.json()
      setClientes(data)
    } catch (err) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      email: '',
    })
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const body = { ...formData }

    const url = editingId
      ? `${API_BASE_URL}/cliente/${editingId}`
      : `${API_BASE_URL}/cliente/create`
    const method = editingId ? 'PUT' : 'POST'

    try {
      setLoading(true)
      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!resp.ok) {
        throw new Error('Error al guardar el cliente')
      }

      resetForm()
      await fetchClientes()
    } catch (err) {
      setError(err.message || 'Error desconocido al guardar')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (cliente) => {
    setEditingId(cliente.id)
    setFormData({
      primerNombre: cliente.primerNombre || '',
      segundoNombre: cliente.segundoNombre || '',
      primerApellido: cliente.primerApellido || '',
      segundoApellido: cliente.segundoApellido || '',
      email: cliente.email || '',
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este cliente?')) return

    try {
      setLoading(true)
      setError('')
      const resp = await fetch(`${API_BASE_URL}/cliente/${id}`, {
        method: 'DELETE',
      })
      if (!resp.ok) {
        throw new Error('Error al eliminar el cliente')
      }
      setClientes((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      setError(err.message || 'Error desconocido al eliminar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 35%, #f9fafb 100%)',
        padding: '2.5rem 1rem',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '1.5rem',
            gap: '1rem',
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '2rem',
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              Gestión de Clientes
            </h1>
            <p
              style={{
                margin: '0.3rem 0 0',
                color: '#64748b',
                fontSize: '0.9rem',
              }}
            >
              Administra, crea y edita los registros de tus clientes en una vista moderna.
            </p>
          </div>
        </header>

        {error && (
          <div
            style={{
              marginBottom: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '999px',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              fontSize: '0.85rem',
            }}
          >
            {error}
          </div>
        )}

        {loading && (
          <p style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: '#6b7280' }}>
            Cargando...
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1.3fr)',
            gap: '1.5rem',
          }}
        >
          <section
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1.1rem',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 18px 40px rgba(15, 23, 42, 0.14)',
              border: '1px solid rgba(148, 163, 184, 0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  color: '#0f172a',
                }}
              >
                Listado de clientes
              </h2>
              <button
                type="button"
                onClick={fetchClientes}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(37, 99, 235, 0.4)',
                  backgroundColor: 'rgba(37, 99, 235, 0.06)',
                  color: '#1d4ed8',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Recargar
              </button>
            </div>

            <div
              style={{
                borderRadius: '0.85rem',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.85rem',
                }}
              >
                <thead style={{ backgroundColor: '#f8fafc' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.6rem 0.9rem', color: '#64748b' }}>
                      Primer nombre
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.6rem 0.9rem', color: '#64748b' }}>
                      Segundo nombre
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.6rem 0.9rem', color: '#64748b' }}>
                      Primer apellido
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.6rem 0.9rem', color: '#64748b' }}>
                      Segundo apellido
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.6rem 0.9rem', color: '#64748b' }}>
                      Email
                    </th>
                    <th
                      style={{
                        textAlign: 'center',
                        padding: '0.6rem 0.9rem',
                        color: '#64748b',
                      }}
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        style={{
                          padding: '0.9rem',
                          textAlign: 'center',
                          color: '#94a3b8',
                        }}
                      >
                        No hay clientes registrados.
                      </td>
                    </tr>
                  ) : (
                    clientes.map((c, index) => (
                      <tr
                        key={c.id || index}
                        style={{
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                        }}
                      >
                        <td style={{ padding: '0.55rem 0.9rem', color: '#0f172a' }}>
                          {c.primerNombre}
                        </td>
                        <td style={{ padding: '0.55rem 0.9rem', color: '#0f172a' }}>
                          {c.segundoNombre}
                        </td>
                        <td style={{ padding: '0.55rem 0.9rem', color: '#0f172a' }}>
                          {c.primerApellido}
                        </td>
                        <td style={{ padding: '0.55rem 0.9rem', color: '#0f172a' }}>
                          {c.segundoApellido}
                        </td>
                        <td style={{ padding: '0.55rem 0.9rem', color: '#0f172a' }}>
                          {c.email}
                        </td>
                        <td style={{ padding: '0.55rem 0.9rem', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleEdit(c)}
                            style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '999px',
                              border: 'none',
                              backgroundColor: '#e0f2fe',
                              color: '#0369a1',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              marginRight: '0.4rem',
                            }}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(c.id)}
                            style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '999px',
                              border: 'none',
                              backgroundColor: '#fee2e2',
                              color: '#b91c1c',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '1.1rem',
              padding: '1.4rem 1.6rem',
              boxShadow: '0 22px 45px rgba(15, 23, 42, 0.75)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-40%',
                background:
                  'radial-gradient(circle at top left, rgba(59,130,246,0.45), transparent 55%), radial-gradient(circle at bottom right, rgba(45,212,191,0.4), transparent 55%)',
                opacity: 0.8,
              }}
            />
            <div style={{ position: 'relative' }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                }}
              >
                {editingId ? 'Editar cliente' : 'Nuevo cliente'}
              </h2>
              <p
                style={{
                  margin: 0,
                  marginBottom: '0.9rem',
                  fontSize: '0.8rem',
                  color: 'rgba(226, 232, 240, 0.9)',
                }}
              >
                Completa los datos y guarda para mantener tu base de clientes al día.
              </p>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'grid',
                  gap: '0.75rem',
                  fontSize: '0.85rem',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>
                      Primer nombre *
                    </label>
                    <input
                      type="text"
                      name="primerNombre"
                      value={formData.primerNombre}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.6rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(148, 163, 184, 0.7)',
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        color: 'white',
                        fontSize: '0.83rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>
                      Segundo nombre
                    </label>
                    <input
                      type="text"
                      name="segundoNombre"
                      value={formData.segundoNombre}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.6rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(148, 163, 184, 0.7)',
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        color: 'white',
                        fontSize: '0.83rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>
                      Primer apellido *
                    </label>
                    <input
                      type="text"
                      name="primerApellido"
                      value={formData.primerApellido}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.6rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(148, 163, 184, 0.7)',
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        color: 'white',
                        fontSize: '0.83rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>
                      Segundo apellido
                    </label>
                    <input
                      type="text"
                      name="segundoApellido"
                      value={formData.segundoApellido}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.6rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(148, 163, 184, 0.7)',
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        color: 'white',
                        fontSize: '0.83rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.6rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(148, 163, 184, 0.7)',
                      backgroundColor: 'rgba(15, 23, 42, 0.65)',
                      color: 'white',
                      fontSize: '0.83rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.25rem',
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      padding: '0.5rem 1.2rem',
                      borderRadius: '999px',
                      border: 'none',
                      background:
                        'linear-gradient(135deg, #4f46e5, #2563eb, #22c55e)',
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 12px 30px rgba(15, 23, 42, 0.6)',
                    }}
                  >
                    {editingId ? 'Actualizar cliente' : 'Crear cliente'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      style={{
                        padding: '0.45rem 1rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(148, 163, 184, 0.8)',
                        backgroundColor: 'transparent',
                        color: 'rgba(226, 232, 240, 0.95)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      Cancelar
                    </button>
                  )}
                </div>

                <p
                  style={{
                    margin: '0.3rem 0 0',
                    fontSize: '0.75rem',
                    color: 'rgba(226, 232, 240, 0.8)',
                  }}
                >
                  Los campos marcados con * son obligatorios.
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ClienteCrud

