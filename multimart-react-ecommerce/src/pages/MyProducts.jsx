import Table from '../components/Table/Table'
import { useContext, useEffect, useState } from 'react'
import Modal from '../layout/modal'
import RegisterProducts from '../Form/Product/RegisterProducts'
import useWindowScrollToTop from '../hooks/useWindowScrollToTop'
import { GetProductsByStore } from '../api/product'

import { UserContext } from '../context/UserContext'
import { useModal } from '../hooks/useModal'
import UpdateProducts from '../Form/Product/UpdateProducts'
function MyProducts () {
  const { Open: ModalRegister, ToggleState: toggleModalRegister } = useModal()
  const { Open: ModalUpdate, ToggleState: toggleModalUpdate } = useModal()
  const [Id, setId] = useState(null)

  const [Products, setProducts] = useState([])

  const { User } = useContext(UserContext)

  const userColumns = [
    {
      name: 'Nombre Producto',
      selector: (row) => row.nameProduct,
      sortable: true
    },
    {
      name: 'Imagen',
      selector: (row) => (
        <img
          src={row.imgUrl}
          alt={row.nameProduct} // Asegúrate de proporcionar un texto alternativo
          style={{ width: '150px', height: '150px' }} // Ajusta el tamaño según tus necesidades
        />
      ),
      sortable: true
    },
    {
      name: 'Descripcion',
      selector: (row) => row.description,
      sortable: true
    },
    {
      name: 'Categoria',
      selector: (row) => row.categories.name,
      sortable: true
    },
    {
      name: 'Precio',
      selector: (row) => row.price,
      sortable: true
    },
    {
      name: 'Cantidad',
      selector: (row) => row.cantidad,
      sortable: true
    },
    {
      name: 'Modificar',
      button: 'true',
      cell: (row) => (
        <a className='Button' onClick={(e) => handleEdit(e, row._id)}>
          Editar
        </a>
      )
    }
  ]

  const handleEdit = (e, id) => {
    toggleModalUpdate()
    setId(id)
  }

  useEffect(() => {
    console.log(User._id)
    GetProductsByStore(User._id)
      .then(response => {
        console.log(response)
        setProducts(response.data || [])
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error)
      })
  }, [User._id])

  console.log(Products)
  console.log(Id)

  useWindowScrollToTop()
  return (
    <section>
      <Table
        title='Productos'
        Coluums={userColumns}
        Data={Products}
        buttonRegister={() => toggleModalRegister()}
      />
      {ModalRegister &&
        <Modal CloseModal={toggleModalRegister}>
          <RegisterProducts />
        </Modal>}
      {ModalUpdate &&
        <Modal CloseModal={toggleModalUpdate}>
          <UpdateProducts id={Id} />
        </Modal>}
    </section>
  )
}

export default MyProducts
